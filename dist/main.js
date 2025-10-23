"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("@nestjs/config");
async function runServer() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Equivalent of express.raw() for /webhook
    // app.use("/webhook", bodyParser.raw({ type: "application/json" }));
    //Strict Validation for query and body
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // strips unknown fields
        forbidNonWhitelisted: true, // throws if unknown field present
        forbidUnknownValues: true,
        transform: true, // auto-transform strings to expected types
    }));
    // For signature verification adding extra step.
    app.use("/webhook", body_parser_1.default.raw({ type: "application/json" }));
    // Equivalent of express.json() for other routes.
    app.use(body_parser_1.default.json());
    // Base route equivalent
    app.getHttpAdapter().get("/", (req, res) => {
        res.json("Welcome to GoodPass.");
    });
    // ✅ Now ConfigService is available after the app is created
    const configService = app.get(config_1.ConfigService);
    // ✅ Either from ConfigService or directly from process.env
    const env = configService.get("NODE_ENV");
    let port = env === "DEVELOPMENT" ? configService.get("DEV_PORT") : 3000;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
}
runServer();
