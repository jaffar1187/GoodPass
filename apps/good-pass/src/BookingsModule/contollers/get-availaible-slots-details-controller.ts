import {
  Controller,
  Get,
  Query,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { GetAvailaibleSlotsDetailsService } from "../services/get-availaible-slots-details-service";
import { GetAvailaibleSlotsDetailsDto } from "../dto/get-availaible-slots-details-dto";

@Controller("api")
export class GetAvailaibleSlotsDetailsController {
  constructor(
    private readonly getAvailaibleSlotsDetailsService: GetAvailaibleSlotsDetailsService
  ) {}

  @Get("getAvailaibleSlotsDetails")
  async getAvailaibleDates(
    @Body(new ValidationPipe({ transform: true }))
    body: GetAvailaibleSlotsDetailsDto,
    @Headers("authorization") authHeader: string
  ) {
    let { productId, date } = body;
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

    // return await this.getAvailaibleDates(productId, authHeader);
    return await this.getAvailaibleSlotsDetailsService.getAvailaibleSlotsDetails(
      productId,
      date,
      token
    );

    // return await this.GetAvailableDatesService.getAvailaibleDates(
    //   productId,
    //   authHeader
    // );
  }
}
