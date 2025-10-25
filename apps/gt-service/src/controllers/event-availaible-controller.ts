import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { EventAvailaibleService } from "../services/event-availaible-service";

@Controller()
export class EventAvailaibleController {
  private lastProcessed?: string;

  constructor(
    private readonly eventAvailaibleService: EventAvailaibleService
  ) {}

  @MessagePattern({ cmd: "event_availability" })
  async eventAvailability(data: any) {
    // 1️⃣ Ignore empty or malformed payloads
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("⚠️ Ignored empty or invalid event payload");
      return;
    }

    // 2️⃣ Validate structure of each item
    const valid = data.every(
      (item) =>
        item.itemId &&
        item.name &&
        item.supplierMappings &&
        item.supplierMappings.globaltix
    );

    if (!valid) {
      console.log("⚠️ Ignored malformed event data structure");
      return;
    }

    // 3️⃣ Check for duplicate payloads (same data sent again)
    const signature = JSON.stringify(data);
    if (this.lastProcessed === signature) {
      console.log("⚠️ Duplicate event data ignored (same payload)");
      return;
    }
    this.lastProcessed = signature;

    // 4️⃣ Pretty print the valid data
    console.log(
      "📦 Received event data from good-pass:\n",
      JSON.stringify(data, null, 2)
    );

    // 5️⃣ Call the service for actual processing
    try {
      const response = await this.eventAvailaibleService.eventAvailaible(data);
      console.log("✅ Event availability processed successfully");
      return response;
    } catch (error: any) {
      console.log(`❌ Event availability failed: ${error.message}`);
      delete this.lastProcessed; // Allow retry on failure
      return {
        status: "error",
        message: error.message || "Event availability processing failed",
      };
    }
  }
}
