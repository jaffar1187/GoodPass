import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ConfirmBookingService } from "../services/confirm-booking-service";

@Controller()
export class ConfirmBookingController {
  constructor(private readonly confirmBookingService: ConfirmBookingService) {}

  @MessagePattern({ cmd: "confirm_booking" })
  async confirmBooking(data: any) {
    console.log("::::confirm_booking_data_recieved-ref::::", data);
    return await this.confirmBookingService.confirmBooking(data);
  }
}
