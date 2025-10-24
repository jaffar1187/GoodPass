import {
  Controller,
  Put,
  Body,
  Query,
  Headers,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { UpdateCustomerDetailsService } from "../services/update-customer-details-service";
import { UpdateCustomerDetailsDto } from "../dto/update-customer-details-dto";

@Controller("api")
export class UpdateCustomerDetailsController {
  constructor(
    private readonly updateCustomerDetailsService: UpdateCustomerDetailsService
  ) {}

  @Put("updateCustomerDetails")
  async updateCustomerDetails(
    @Body(new ValidationPipe({ transform: true }))
    body: UpdateCustomerDetailsDto,
    @Query("orderCode")
    orderCode: string,
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

    if (!orderCode)
      throw new HttpException(
        { success: false, message: "OrderCode token is required." },
        HttpStatus.BAD_REQUEST
      );

    // ✅ Pass the entire validated DTO and token to your service
    const data = await this.updateCustomerDetailsService.updateCustomerDetails(
      body,
      token,
      orderCode
    );

    // ✅ Return the same shape your API expects
    return {
      success: true,
      message: "Customer Details Updated Successfully.",
      data,
    };
  }
}
