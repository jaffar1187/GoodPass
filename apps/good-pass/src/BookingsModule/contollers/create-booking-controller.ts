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

import { CreateBookingService } from "../services/create-booking-service";
import { CreateBookingDto } from "../dto/create-booking-dto";
import { GtEventAvailaibleService } from "./../services/gt-event-availaible-service";

@Controller("api")
export class CreateBookingController {
  constructor(
    private readonly createBookingService: CreateBookingService,
    private readonly gtEventAvailaibleService: GtEventAvailaibleService
  ) {}

  @Post("createBooking")
  async createBooking(
    @Body(new ValidationPipe({ transform: true })) body: CreateBookingDto,
    @Headers("authorization") authHeader: string
  ): Promise<any> {
    // ✅ Header validation
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

    const configPath = path.join(
      process.cwd(),
      "apps/good-pass/src/utils/gp-gt-ids.json"
    );
    const gp_gt_ids = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    const allowedProductIds = gp_gt_ids.map((item: any) => {
      return item.productId;
    });

    if (!allowedProductIds.includes(body.productId)) {
      throw new HttpException(
        { success: false, message: "Booking not allowed for id." },
        HttpStatus.BAD_REQUEST
      );
    }

    let ttid = gp_gt_ids.filter(
      (item: any) => item.productId === body.productId
    );

    ttid = ttid[0];
    ttid = ttid.slots.filter((item: any) => item.slotId === body.slot);

    ttid = ttid[0];
    ttid = ttid.options.filter((item: any) => item.optionId === body.option);

    ttid = ttid[0];
    const ticketKeys = Object.keys(body.ticketSelections);
    ttid = ttid.items.filter((item: any) => ticketKeys.includes(item.itemId));

    // console.log("::::::ttid:::::", ttid);

    const eventData = await this.gtEventAvailaibleService.eventAvailaibleCheck(
      ttid
    );

    // console.log("::::::eventData:::::::", eventData);

    const filtered = eventData.filter((item: any) => !item.success);

    if (filtered.length)
      throw new HttpException(
        {
          success: false,
          message: "No events availaible for this booking Id.",
        },
        HttpStatus.BAD_REQUEST
      );

    //Ticket count availaible value greater check
    const targetTime = `${body.date}T00:00:00`;

    ticketKeys.forEach((ticketId, i) => {
      const requestedCount = Number(body.ticketSelections[ticketId] || 0);
      if (!Number.isInteger(requestedCount) || requestedCount <= 0) {
        throw new HttpException(
          `Invalid quantity for ${ticketId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      const event = eventData[i];
      if (!event || !Array.isArray(event.data)) {
        throw new HttpException(
          `Event data missing for ticket ${ticketId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      const dateEntry = event.data.find((d: any) => d.time === targetTime);
      if (!dateEntry) {
        throw new HttpException(
          `Date ${body.date} not available for ${ticketId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      const available = Number(dateEntry.available || 0);
      if (requestedCount > available) {
        throw new HttpException(
          `Requested ${requestedCount} exceeds available ${available} for ${ticketId}`,
          HttpStatus.BAD_REQUEST
        );
      }
      // console.log(":::::requestedCount:::::", requestedCount);
      // console.log(":::::event:::::", event);
      // console.log(":::::dateEntry:::::", dateEntry);
      // console.log(":::::available:::::", available);
    });

    //End of ticket count

    const data = await this.createBookingService.createBooking(body, token);

    return {
      success: true,
      message: "Booking created successfully",
      data,
    };
  }
}
