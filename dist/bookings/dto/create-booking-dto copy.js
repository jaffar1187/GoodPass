"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDto = void 0;
// src/bookings/dto/get-available-dates.dto.ts
const class_validator_1 = require("class-validator");
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "productId is required" }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: "date must be a valid ISO date string (YYYY-MM-DD)" }),
    (0, class_validator_1.IsNotEmpty)({ message: "date is required" }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsObject)({
        message: "ticketSelections must be an object with ticket IDs as keys and quantities as values",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "ticketSelections is required" }),
    __metadata("design:type", Object)
], CreateBookingDto.prototype, "ticketSelections", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: "addonSelections must be an array" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "addonSelections", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "option is required" }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "option", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "slot is required" }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "slot", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: "total must be a positive number" }),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "currency is required" }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "currency", void 0);
