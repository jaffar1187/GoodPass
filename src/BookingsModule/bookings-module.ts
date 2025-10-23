// src/bookings/bookings.module.ts
import { Module } from "@nestjs/common";

import { GetAvailableDatesController } from "./contollers/get-Availaible-dates-controller";
import { GetAvailaibleSlotsDetailsController } from "./contollers/get-availaible-slots-details-controller";
import { CreateBookingController } from "./contollers/create-booking-controller";
import { UpdateCustomerDetailsController } from "./contollers/update-customer-details-controller";
import { RetrieveBookingDetailsController } from "./contollers/retrieve-booking-details-controller";
import { MakePaymentController } from "./contollers/make-payment-controller";

import { GetAvailableDatesService } from "./services/get-availaible-dates-service";
import { GetAvailaibleSlotsDetailsService } from "./services/get-availaible-slots-details-service";
import { CreateBookingService } from "./services/create-booking-service";
import { UpdateCustomerDetailsService } from "./services/update-customer-details-service";
import { RetrieveBookingDetailsService } from "./services/retrieve-booking-details-service";
import { MakePaymentService } from "./services/make-payment-service";

@Module({
  controllers: [
    GetAvailableDatesController,
    GetAvailaibleSlotsDetailsController,
    CreateBookingController,
    UpdateCustomerDetailsController,
    RetrieveBookingDetailsController,
    MakePaymentController,
  ],
  providers: [
    GetAvailableDatesService,
    GetAvailaibleSlotsDetailsService,
    CreateBookingService,
    UpdateCustomerDetailsService,
    RetrieveBookingDetailsService,
    MakePaymentService,
  ],
})
export class BookingsModule {}
