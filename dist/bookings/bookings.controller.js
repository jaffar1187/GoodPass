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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableDatesController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const get_availaible_dates_dto_1 = require("./dto/get-availaible-dates.dto");
let GetAvailableDatesController = class GetAvailableDatesController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async getAvailaibleDates(query, productId, authHeader) {
        if (!authHeader) {
            throw new common_1.HttpException({ success: false, message: "Authorization token is missing" }, common_1.HttpStatus.UNAUTHORIZED);
        }
        return await this.bookingsService.getAvailaibleDates(productId, authHeader);
    }
};
exports.GetAvailableDatesController = GetAvailableDatesController;
__decorate([
    (0, common_1.Get)("getAvailaibleDates"),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)("productId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_availaible_dates_dto_1.GetAvailableDatesDto, String, String]),
    __metadata("design:returntype", Promise)
], GetAvailableDatesController.prototype, "getAvailaibleDates", null);
exports.GetAvailableDatesController = GetAvailableDatesController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], GetAvailableDatesController);
