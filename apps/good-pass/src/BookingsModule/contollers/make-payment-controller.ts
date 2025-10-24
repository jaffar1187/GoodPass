import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { MakePaymentService } from "../services/make-payment-service";
import { MakePaymentDto } from "../dto/make-payment-dto";

@Controller("api")
export class MakePaymentController {
  constructor(private readonly makePaymentService: MakePaymentService) {}

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

    // ✅ Return the same shape your API expects
    return {
      data,
    };
  }
}
