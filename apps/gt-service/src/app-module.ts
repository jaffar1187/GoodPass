import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GtService } from "./gt-service.service";
import { GtServiceController } from "./gt-service.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // available everywhere in this microservice
      envFilePath: ".env", // loads apps/gt-service/.env
    }),
  ],
  controllers: [GtServiceController],
  providers: [GtService],
  exports: [GtService],
})
export class AppModule {}
