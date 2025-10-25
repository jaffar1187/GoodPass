// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";

// @Injectable()
// export class WebhookService {
//   constructor(private readonly configService: ConfigService) {}

//   async processWebhook(body: any) {
//     return {
//       success: true,
//       message: "Webhook processed successfully",
//       event: body,
//     };
//   }
// }

import { Injectable, OnModuleInit } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WebhookService implements OnModuleInit {
  private client!: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>("GT_SERVICE_HOST");
    const port = this.configService.get<number>("GT_SERVICE_PORT");

    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host, port },
    });
  }

  async processWebhook(data: any) {
    return await firstValueFrom(
      this.client.send({ cmd: "confirm_booking" }, data)
    );
  }
}
