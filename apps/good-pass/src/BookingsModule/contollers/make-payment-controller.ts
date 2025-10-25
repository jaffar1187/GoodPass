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
import { setCache } from "./../../common/redis"; // ✅ Redis helper

import { MakePaymentService } from "../services/make-payment-service";
import { MakePaymentDto } from "../dto/make-payment-dto";
import { GtClientService } from "./../services/gt-client-reserve-booking-service";
import { RetrieveBookingDetailsService } from "./../services/retrieve-booking-details-service";
import { ConfigService } from "@nestjs/config";

@Controller("api")
export class MakePaymentController {
  constructor(
    private readonly makePaymentService: MakePaymentService,
    private readonly gtClientService: GtClientService,
    private readonly retrieveBookingDetailsService: RetrieveBookingDetailsService,
    private readonly configService: ConfigService
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

    // ✅ Step 1: Create payment
    const data = await this.makePaymentService.makePayment(
      orderCode,
      successUrl,
      cancelUrl,
      token
    );

    // ✅ Step 2: Retrieve booking details
    const bookingDetails =
      await this.retrieveBookingDetailsService.retrieveBookingDetails(
        orderCode,
        token
      );

    // ✅ Step 3: Read mapping file (gp-gt-ids.json)
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

    // ✅ Step 4: Filter matching ticket items
    const filteredTtid = ttid.items.filter((item: any) =>
      ticketKeys.includes(item.itemId)
    );

    // ✅ Step 5: Build ticketTypes for GlobalTix API
    const ticketTypes = bookingDetails.items[0].ticketItems.map(
      (item: any, index: number) => {
        return {
          id: filteredTtid[index].supplierMappings.globaltix,
          visitDate: bookingDetails.items[0].date.split("T")[0],
          quantity: item.qty,
        };
      }
    );

    // ✅ Step 6: Reserve booking with GT service
    const reserveBooking = await this.gtClientService.reserveBooking({
      ticketTypes: ticketTypes,
      customerName: bookingDetails.name,
      email: bookingDetails.email,
      paymentMethod: "CREDIT",
    });

    // ✅ Step 7: Store mapping in Redis (orderCode → referenceNumber)
    const referenceNumber =
      reserveBooking?.received?.data?.referenceNumber ||
      reserveBooking?.data?.referenceNumber;

    if (referenceNumber && orderCode) {
      await setCache(orderCode, referenceNumber, 3600);
      console.log(`🧠 Cached: ${orderCode} → ${referenceNumber} (TTL: 1 hour)`);
    } else {
      console.warn("⚠️ Missing orderCode or referenceNumber, cache skipped");
    }

    // ✅ Step 8: Return full response
    return {
      data,
      reserveBooking,
    };
  }
}
