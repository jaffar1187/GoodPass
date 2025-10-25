import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app-module";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const env = configService.get<string>("NODE_ENV");
  let host = "127.0.0.1";
  let port = 4000;
  if (env === "PRODUCTION") {
    host = "0.0.0.0";
    port = configService.get<number>("GT_SERVICE_PORT") || 4000;
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    }
  );

  await app.listen();
  console.log(`✅ GT-Service listening on TCP port ${port}`);
}

bootstrap();
