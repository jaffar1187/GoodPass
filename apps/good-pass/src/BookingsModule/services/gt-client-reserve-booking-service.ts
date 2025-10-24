import { Injectable, OnModuleInit } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GtClientService implements OnModuleInit {
  private client!: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>("GT_SERVICE_HOST");
    const port = this.configService.get<number>("GT_SERVICE_PORT");

    console.log("::::::::Port::::::::", port);

    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host, port },
    });
  }

  async reserveBooking(data: any) {
    return await firstValueFrom(
      this.client.send({ cmd: "reserve_booking" }, data)
    );
  }
}
