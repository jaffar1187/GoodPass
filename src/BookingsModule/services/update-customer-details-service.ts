import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { toString } from "validator";

@Injectable()
export class UpdateCustomerDetailsService {
  async updateCustomerDetails(
    body: object,
    token: string,
    orderCode: string
  ): Promise<any> {
    const options = {
      method: "PUT",
      url: `https://partner-api.goodpass.club/v1/orders/${orderCode}/customer`,
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
      throw new HttpException(
        "Failed to update details, Please try after sometime.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
