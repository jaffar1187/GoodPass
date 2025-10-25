import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfirmBookingService {
  constructor(private readonly configService: ConfigService) {}
  async confirmBooking(bookingData: any): Promise<any> {
    const token = this.configService.get<string>("GT_SERVICE_TOKEN");
    console.log("📦 Received confirm_booking data:", bookingData);

    // 4️⃣ Send API call
    try {
      const options = {
        method: "POST",
        url: `https://stg-api.globaltix.com/api/booking/confirm`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: bookingData,
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Failed to do booking, Please try after sometime.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
