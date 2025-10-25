import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { EventAvailaibleService } from "../services/event-availaible-service";

@Controller()
export class EventAvailaibleController {
  constructor(
    private readonly eventAvailaibleService: EventAvailaibleService
  ) {}

  @MessagePattern({ cmd: "event_availability" })
  async eventAvailability(data: any) {
    console.log("📦 Received event data from good-pass:", data);
    return await this.eventAvailaibleService.eventAvailaible(data);
  }
}
