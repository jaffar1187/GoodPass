import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ReserveBookingService } from "../services/reserve-booking-service";

@Controller()
export class ReserveBookingController {
  private lastProcessed?: string;

  constructor(private readonly reserveBookingService: ReserveBookingService) {}

  @MessagePattern({ cmd: "reserve_booking" })
  async handleBooking(data: any) {
    // 1️⃣ Ignore empty or malformed payloads
    if (!data || Object.keys(data).length === 0) {
      console.log("⚠️ Ignored empty TCP payload");
      return;
    }

    // 2️⃣ Validate required top-level fields
    const requiredKeys = [
      "ticketTypes",
      "customerName",
      "email",
      "paymentMethod",
    ];
    const missing = requiredKeys.filter((key) => !data[key]);
    if (missing.length > 0) {
      console.log(
        `⚠️ Ignored incomplete payload — missing: ${missing.join(", ")}`
      );
      return;
    }

    // 3️⃣ Validate ticketTypes array structure
    if (
      !Array.isArray(data.ticketTypes) ||
      data.ticketTypes.length === 0 ||
      !data.ticketTypes.every(
        (ticket: any) =>
          ticket.id && ticket.visitDate && ticket.quantity !== undefined
      )
    ) {
      console.log("⚠️ Ignored invalid ticketTypes structure");
      return;
    }

    // 4️⃣ Skip duplicate payloads
    const signature = JSON.stringify({
      customerName: data.customerName,
      email: data.email,
      ticketTypes: data.ticketTypes,
    });

    if (this.lastProcessed === signature) {
      console.log("⚠️ Duplicate booking payload ignored (same data)");
      return;
    }
    this.lastProcessed = signature;

    // 5️⃣ Call the service to make the API request
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
