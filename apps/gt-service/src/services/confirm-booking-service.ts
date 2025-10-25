import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfirmBookingService {
  constructor(private readonly configService: ConfigService) {}
  async confirmBooking(bookingData: any): Promise<any> {
    const token = this.configService.get<string>("GT_SERVICE_TOKEN");
    console.log(
      "📦 Received confirm_booking data from good-pass:",
      bookingData
    );

    // 4️⃣ Send API call
    // try {
    //   let finalData = [];
    //   for (let i = 0; i < ttid.length; i++) {
    //     const options = {
    //       method: "POST",
    //       url: `https://stg-api.globaltix.com/api/ticketType/checkEventAvailability?dateFrom=2025-10-30&ticketTypeID=${ttid[i].supplierMappings.globaltix}&dateTo=2026-11-30`,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //     const { data } = await axios.request(options);
    //     finalData.push(data);
    //   }
    //   return finalData;
    // } catch (error) {
    //   console.log(error);
    //   throw new HttpException(
    //     "Failed to do booking, Please try after sometime.",
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
  }
}
