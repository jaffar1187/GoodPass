import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ReserveBookingService } from "./services/reserve-booking-service";
import { ReserveBookingController } from "./controllers/reserve-booking-controller";

import { EventAvailaibleController } from "./controllers/event-availaible-controller";
import { EventAvailaibleService } from "./services/event-availaible-service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // available everywhere in this microservice
      envFilePath: ".env", // loads apps/gt-service/.env
    }),
  ],
  controllers: [ReserveBookingController, EventAvailaibleController],
  providers: [ReserveBookingService, EventAvailaibleService],
})
export class AppModule {}
