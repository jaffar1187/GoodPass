import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { toString } from "validator";

@Injectable()
export class CreateBookingService {
  async createBooking(body: object, token: string): Promise<any> {
    const options = {
      method: "POST",
      url: `https://partner-api.goodpass.club/v1/orders/temp`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    };

    // 4️⃣ Send API call
    try {
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
