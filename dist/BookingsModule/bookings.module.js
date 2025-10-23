"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsModule = void 0;
// src/bookings/bookings.module.ts
const common_1 = require("@nestjs/common");
const get_Availaible_dates_controller_1 = require("./contollers/get-Availaible-dates-controller");
const get_availaible_slots_details_controller_1 = require("./contollers/get-availaible-slots-details-controller");
const create_booking_controller_1 = require("./contollers/create-booking-controller");
const update_customer_details_controller_1 = require("./contollers/update-customer-details-controller");
const retrieve_booking_details_controller_1 = require("./contollers/retrieve-booking-details-controller");
const make_payment_controller_1 = require("./contollers/make-payment-controller");
const get_availaible_dates_service_1 = require("./services/get-availaible-dates-service");
const get_availaible_slots_details_service_1 = require("./services/get-availaible-slots-details-service");
const create_booking_service_1 = require("./services/create-booking-service");
const update_customer_details_service_1 = require("./services/update-customer-details-service");
const retrieve_booking_details_service_1 = require("./services/retrieve-booking-details-service");
const make_payment_service_1 = require("./services/make-payment-service");
let BookingsModule = class BookingsModule {
};
exports.BookingsModule = BookingsModule;
exports.BookingsModule = BookingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            get_Availaible_dates_controller_1.GetAvailableDatesController,
            get_availaible_slots_details_controller_1.GetAvailaibleSlotsDetailsController,
            create_booking_controller_1.CreateBookingController,
            update_customer_details_controller_1.UpdateCustomerDetailsController,
            retrieve_booking_details_controller_1.RetrieveBookingDetailsController,
            make_payment_controller_1.MakePaymentController,
        ],
        providers: [
            get_availaible_dates_service_1.GetAvailableDatesService,
            get_availaible_slots_details_service_1.GetAvailaibleSlotsDetailsService,
            create_booking_service_1.CreateBookingService,
            update_customer_details_service_1.UpdateCustomerDetailsService,
            retrieve_booking_details_service_1.RetrieveBookingDetailsService,
            make_payment_service_1.MakePaymentService,
        ],
    })
], BookingsModule);
