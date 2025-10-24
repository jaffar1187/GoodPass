import {
  Controller,
  Get,
  Query,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { RetrieveBookingDetailsService } from "../services/retrieve-booking-details-service";
import { RetrieveBookingDetailsDto } from "../dto/retrieve-booking-details-dto";

@Controller("api")
export class RetrieveBookingDetailsController {
  constructor(
    private readonly retrieveBookingDetailsService: RetrieveBookingDetailsService
  ) {}

  @Get("retrieveBookingDetails")
  async retrieveBookingDetails(
    @Query(new ValidationPipe({ transform: true }))
    query: RetrieveBookingDetailsDto,
    @Query("orderCode") orderCode: string,
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
    return await this.retrieveBookingDetailsService.retrieveBookingDetails(
      orderCode,
      token
    );

    // return await this.GetAvailableDatesService.getAvailaibleDates(
    //   productId,
    //   authHeader
    // );
  }
}
