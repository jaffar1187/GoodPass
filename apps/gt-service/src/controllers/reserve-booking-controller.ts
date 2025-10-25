import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ReserveBookingService } from "../services/reserve-booking-service";

@Controller()
export class ReserveBookingController {
  private lastProcessed?: string;

  constructor(private readonly reserveBookingService: ReserveBookingService) {}

  @MessagePattern({ cmd: "reserve_booking" })
  async handleBooking(data: any) {
    try {
      console.log(
        "📦 Processing valid booking with data:\n",
        JSON.stringify(data, null, 2)
      );

      const response = await this.reserveBookingService.reserveBooking(data);

      return response;
    } catch (error: any) {
      console.log(
        `❌ Booking failed for ${data.customerName}: ${
          error.response?.data?.message || error.message
        }`
      );

      // Allow retry if failure
      delete this.lastProcessed;

      return {
        status: "error",
        message:
          error.response?.data?.message || "GlobalTix reservation failed",
      };
    }
  }
}
