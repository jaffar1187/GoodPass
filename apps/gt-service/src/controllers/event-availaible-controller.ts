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
