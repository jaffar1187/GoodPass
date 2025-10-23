import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class GetAvailableDatesService {
  async getAvailaibleDates(productId: string, token: string): Promise<any> {
    const options = {
      method: "GET",
      url: `https://partner-api.goodpass.club/v1/products/${productId}/available-dates`,
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
        "Failed to fetch available dates",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
