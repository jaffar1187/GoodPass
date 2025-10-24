import { Controller, Get } from '@nestjs/common';
import { GtServiceService } from './gt-service.service';

@Controller()
export class GtServiceController {
  constructor(private readonly gtServiceService: GtServiceService) {}

  @Get()
  getHello(): string {
    return this.gtServiceService.getHello();
  }
}
