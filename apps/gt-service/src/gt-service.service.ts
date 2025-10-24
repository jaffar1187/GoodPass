import { Injectable } from "@nestjs/common";

@Injectable()
export class GtService {
  reserveBooking(data: any) {
    // Your booking processing logic here
    console.log("Processing booking:", data);
    return { status: "success", received: data };
  }
}
