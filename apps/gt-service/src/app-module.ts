import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ReserveBookingService } from "./services/reserve-booking-service";
import { ReserveBookingController } from "./controllers/reserve-booking-controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // available everywhere in this microservice
      envFilePath: ".env", // loads apps/gt-service/.env
    }),
  ],
  controllers: [ReserveBookingController],
  providers: [ReserveBookingService],
  exports: [ReserveBookingService],
})
export class AppModule {}
