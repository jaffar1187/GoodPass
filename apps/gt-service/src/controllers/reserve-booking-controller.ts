import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ReserveBookingService } from "../services/reserve-booking-service";

@Controller()
export class ReserveBookingController {
  constructor(private readonly reserveBookingService: ReserveBookingService) {}

  @MessagePattern({ cmd: "reserve_booking" })
  handleBooking(data: any) {
    console.log("📦 Received booking data from good-pass:", data);
    return this.reserveBookingService.reserveBooking(data);
  }
}
