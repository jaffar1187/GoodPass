import {
  Controller,
  Get,
  Query,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { GetAvailableDatesService } from "../services/get-availaible-dates-service";
import { GetAvailableDatesDto } from "../dto/get-availaible-dates-dto";

@Controller("api")
export class GetAvailableDatesController {
  constructor(
    private readonly getAvailaibleDatesService: GetAvailableDatesService
  ) {}

  @Get("getAvailaibleDates")
  async getAvailaibleDates(
    @Query(new ValidationPipe({ transform: true })) query: GetAvailableDatesDto,
    @Query("productId") productId: string,
    @Headers("authorization") authHeader: string
  ) {
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
    return await this.getAvailaibleDatesService.getAvailaibleDates(
      productId,
      token
    );

    // return await this.GetAvailableDatesService.getAvailaibleDates(
    //   productId,
    //   authHeader
    // );
  }
}
