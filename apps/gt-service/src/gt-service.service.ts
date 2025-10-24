import { Injectable } from '@nestjs/common';

@Injectable()
export class GtServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
