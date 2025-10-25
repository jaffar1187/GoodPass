import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ConfirmBookingService } from "../services/confirm-booking-service";

@Controller()
export class ConfirmBookingController {
  constructor(private readonly confirmBookingService: ConfirmBookingService) {}

  @MessagePattern({ cmd: "confirm_booking" })
  async confirmBooking(data: any) {
    return await this.confirmBookingService.confirmBooking(data);
  }
}
