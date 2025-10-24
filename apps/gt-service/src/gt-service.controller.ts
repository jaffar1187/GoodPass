import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { GtService } from "./gt-service.service";

@Controller()
export class GtServiceController {
  constructor(private readonly gtService: GtService) {}

  @MessagePattern({ cmd: "reserve_booking" })
  handleBooking(data: any) {
    console.log("📦 Received booking data from good-pass:", data);
    return this.gtService.reserveBooking(data);
  }
}
