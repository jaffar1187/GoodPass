// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import bodyParser from "body-parser";
import { ConfigService } from "@nestjs/config";

async function runServer() {
  const app = await NestFactory.create(AppModule);

  // Equivalent of express.raw() for /webhook
  // app.use("/webhook", bodyParser.raw({ type: "application/json" }));

  //Strict Validation for query and body
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      forbidNonWhitelisted: true, // throws if unknown field present
      forbidUnknownValues: true,
      transform: true, // auto-transform strings to expected types
    })
  );

  // For signature verification adding extra step.
  app.use("/webhook", bodyParser.raw({ type: "application/json" }));

  // Equivalent of express.json() for other routes
  app.use(bodyParser.json());

  // Base route equivalent
  app.getHttpAdapter().get("/", (req, res) => {
    res.json("Welcome to GoodPass.");
  });

  // ✅ Now ConfigService is available after the app is created
  const configService = app.get(ConfigService);

  // ✅ Either from ConfigService or directly from process.env
  const env = configService.get("NODE_ENV");
  let port = env === "DEVELOPMENT" ? configService.get("DEV_PORT") : 3000;

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

runServer();
