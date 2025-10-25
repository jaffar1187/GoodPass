import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

import { MakePaymentService } from "../services/make-payment-service";
import { MakePaymentDto } from "../dto/make-payment-dto";
import { GtClientService } from "./../services/gt-client-reserve-booking-service";
import { RetrieveBookingDetailsService } from "./../services/retrieve-booking-details-service";

@Controller("api")
export class MakePaymentController {
  constructor(
    private readonly makePaymentService: MakePaymentService,
    private readonly gtClientService: GtClientService,
    private readonly retrieveBookingDetailsService: RetrieveBookingDetailsService
  ) {}

  @Post("makePayment")
  async makePayment(
    @Body(new ValidationPipe({ transform: true })) body: MakePaymentDto,
    @Headers("authorization") authHeader: string
  ): Promise<any> {
    // ✅ Header validation
    let { orderCode, successUrl, cancelUrl } = body;
    if (!authHeader) {
      throw new HttpException(
        { success: false, message: "Authorization token is missing" },
        HttpStatus.UNAUTHORIZED
      );
    }

    let token = authHeader.trim();
    if (token.toLowerCase().startsWith("bearer ")) {
      token = token.slice(7).trim(); // remove “Bearer ”
    }

    // ✅ Pass the entire validated DTO and token to your service
    const data = await this.makePaymentService.makePayment(
      orderCode,
      successUrl,
      cancelUrl,
      token
    );

    const bookingDetails =
      await this.retrieveBookingDetailsService.retrieveBookingDetails(
        orderCode,
        token
      );

    const configPath = path.join(
      process.cwd(),
      "apps/good-pass/src/utils/gp-gt-ids.json"
    );
    const gp_gt_ids = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    let ttid = gp_gt_ids.filter(
      (item: any) => item.productId === bookingDetails.items[0].productId
    );

    ttid = ttid[0];
    ttid = ttid.slots.filter(
      (item: any) => item.slotId === bookingDetails.items[0].dateSlotId
    );

    ttid = ttid[0];
    ttid = ttid.options.filter(
      (item: any) => item.optionId === bookingDetails.items[0].optionId
    );

    ttid = ttid[0];
    const ticketKeys = bookingDetails.items[0].ticketItems.map(
      (item: any) => item.ticketId
    );

    // ✅ Step 2: filter your items array based on those IDs
    const filteredTtid = ttid.items.filter((item: any) =>
      ticketKeys.includes(item.itemId)
    );

    const ticketTypes = bookingDetails.items[0].ticketItems.map(
      (item: any, index: number) => {
        return {
          id: filteredTtid[index].supplierMappings.globaltix,
          visitDate: bookingDetails.items[0].date.split("T")[0],
          quantity: item.qty,
        };
      }
    );

    console.log(":::::ticketTypes::::::", ticketTypes);

    const reserveBooking = await this.gtClientService.reserveBooking({
      ticketTypes: ticketTypes,
      customerName: bookingDetails.name,
      email: bookingDetails.email,
      paymentMethod: "CREDIT",
    });

    return {
      data,
      reserveBooking,
    };
  }
}
