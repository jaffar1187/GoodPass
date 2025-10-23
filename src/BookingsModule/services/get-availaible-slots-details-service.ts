import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { toString } from "validator";

@Injectable()
export class GetAvailaibleSlotsDetailsService {
  async getAvailaibleSlotsDetails(
    productId: string,
    date: string,
    token: string
  ): Promise<any> {
    const options = {
      method: "GET",
      url: `https://partner-api.goodpass.club/v1/products/${productId}/prices`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { date },
    };

    // 4️⃣ Send API call
    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch available slots details",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
