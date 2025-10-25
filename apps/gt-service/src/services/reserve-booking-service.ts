import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class ReserveBookingService {
  constructor(private readonly configService: ConfigService) {}

  async reserveBooking(reserveBookingData: any) {
    const token = this.configService.get<string>("GT_SERVICE_TOKEN");

    const options = {
      method: "POST",
      url: `https://stg-api.globaltix.com/api/booking/reserve`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: reserveBookingData,
    };
    const { data } = await axios.request(options);
    // Your booking processing logic here
    console.log("Processing booking:", data);
    return { status: "success", received: data };
  }
}
