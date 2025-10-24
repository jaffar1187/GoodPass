import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { RetrieveBookingDetailsService } from "./retrieve-booking-details-service";
import { GtClientService } from "./gt-client-reserve-booking-service";

@Injectable()
export class MakePaymentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly retrieveBookingDetailsService: RetrieveBookingDetailsService,
    private readonly gtClientService: GtClientService
  ) {}

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
      const { ...reserveBookingData } =
        await this.retrieveBookingDetailsService.retrieveBookingDetails(
          orderCode,
          token
        );

      if (!reserveBookingData.name || !reserveBookingData.email) {
        throw new HttpException(
          { message: "Customer name and email not found." },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.gtClientService.reserveBooking({
        customerName: reserveBookingData.name,
        email: reserveBookingData.email,
      });

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
