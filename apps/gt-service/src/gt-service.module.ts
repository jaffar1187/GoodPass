import { Module } from '@nestjs/common';
import { GtServiceController } from './gt-service.controller';
import { GtServiceService } from './gt-service.service';

@Module({
  imports: [],
  controllers: [GtServiceController],
  providers: [GtServiceService],
})
export class GtServiceModule {}
