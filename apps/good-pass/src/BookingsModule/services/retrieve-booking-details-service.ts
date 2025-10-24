import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class RetrieveBookingDetailsService {
  async retrieveBookingDetails(orderCode: string, token: string): Promise<any> {
    const options = {
      method: "GET",
      url: `https://partner-api.goodpass.club/v1/orders/${orderCode}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // 4️⃣ Send API call
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch booking details.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
