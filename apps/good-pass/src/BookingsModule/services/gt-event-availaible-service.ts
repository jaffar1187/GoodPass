import { Injectable, OnModuleInit } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GtEventAvailaibleService implements OnModuleInit {
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

  async eventAvailaibleCheck(data: any) {
    return await firstValueFrom(
      this.client.send({ cmd: "event_availability" }, data)
    );
  }
}
