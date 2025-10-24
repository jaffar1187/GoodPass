import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MakePaymentService {
  constructor(private readonly configService: ConfigService) {}

  async makePayment(
    orderCode: string,
    successUrl: string,
    cancelUrl: string,
    token: string
  ): Promise<any> {
    const options = {
      method: "POST",
      url: `https://partner-api.goodpass.club/v1/payments/hosted/create-session`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        orderCode,
        successUrl,
        cancelUrl,
      },
    };

    try {
      const { data } = await axios.request(options);
      return { data };
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.statusCode === 400 &&
        error.response.data.message
      ) {
        throw new HttpException(
          error.response.data.message,
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException(
          "Something went wrong, Please try again later",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
