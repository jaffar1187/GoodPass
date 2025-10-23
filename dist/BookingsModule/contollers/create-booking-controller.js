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
exports.CreateBookingController = void 0;
const common_1 = require("@nestjs/common");
const create_booking_service_1 = require("../services/create-booking-service");
const create_booking_dto_1 = require("../dto/create-booking-dto");
let CreateBookingController = class CreateBookingController {
    constructor(createBookingService) {
        this.createBookingService = createBookingService;
    }
    async createBooking(body, authHeader) {
        // ✅ Header validation
        if (!authHeader) {
            throw new common_1.HttpException({ success: false, message: "Authorization token is missing" }, common_1.HttpStatus.UNAUTHORIZED);
        }
        let token = authHeader.trim();
        if (token.toLowerCase().startsWith("bearer ")) {
            token = token.slice(7).trim(); // remove “Bearer ”
        }
        // ✅ Pass the entire validated DTO and token to your service
        const data = await this.createBookingService.createBooking(body, token);
        // ✅ Return the same shape your API expects
        return {
            success: true,
            message: "Booking created successfully",
            data,
        };
    }
};
exports.CreateBookingController = CreateBookingController;
__decorate([
    (0, common_1.Post)("createBooking"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, String]),
    __metadata("design:returntype", Promise)
], CreateBookingController.prototype, "createBooking", null);
exports.CreateBookingController = CreateBookingController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [create_booking_service_1.CreateBookingService])
], CreateBookingController);
