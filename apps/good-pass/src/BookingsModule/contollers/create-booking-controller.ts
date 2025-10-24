import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { CreateBookingService } from "../services/create-booking-service";
import { CreateBookingDto } from "../dto/create-booking-dto";

@Controller("api")
export class CreateBookingController {
  constructor(private readonly createBookingService: CreateBookingService) {}

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

    // ✅ Pass the entire validated DTO and token to your service
    const data = await this.createBookingService.createBooking(body, token);

    // ✅ Return the same shape your API expects
    return {
      success: true,
      message: "Booking created successfully",
      data,
    };
  }
}
