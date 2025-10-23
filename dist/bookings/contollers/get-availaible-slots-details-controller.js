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
exports.GetAvailaibleSlotsDetailsController = void 0;
const common_1 = require("@nestjs/common");
const get_availaible_slots_details_service_1 = require("../services/get-availaible-slots-details-service");
const get_availaible_slots_details_dto_1 = require("../dto/get-availaible-slots-details-dto");
let GetAvailaibleSlotsDetailsController = class GetAvailaibleSlotsDetailsController {
    constructor(getAvailaibleSlotsDetailsService) {
        this.getAvailaibleSlotsDetailsService = getAvailaibleSlotsDetailsService;
    }
    async getAvailaibleDates(body, authHeader) {
        let { productId, date } = body;
        if (!authHeader) {
            throw new common_1.HttpException({ success: false, message: "Authorization token is missing" }, common_1.HttpStatus.UNAUTHORIZED);
        }
        let token = authHeader.trim();
        if (token.toLowerCase().startsWith("bearer ")) {
            token = token.slice(7).trim(); // remove “Bearer ”
        }
        // return await this.getAvailaibleDates(productId, authHeader);
        return await this.getAvailaibleSlotsDetailsService.getAvailaibleSlotsDetails(productId, date, token);
        // return await this.GetAvailableDatesService.getAvailaibleDates(
        //   productId,
        //   authHeader
        // );
    }
};
exports.GetAvailaibleSlotsDetailsController = GetAvailaibleSlotsDetailsController;
__decorate([
    (0, common_1.Get)("getAvailaibleSlotsDetails"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_availaible_slots_details_dto_1.GetAvailaibleSlotsDetailsDto, String]),
    __metadata("design:returntype", Promise)
], GetAvailaibleSlotsDetailsController.prototype, "getAvailaibleDates", null);
exports.GetAvailaibleSlotsDetailsController = GetAvailaibleSlotsDetailsController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [get_availaible_slots_details_service_1.GetAvailaibleSlotsDetailsService])
], GetAvailaibleSlotsDetailsController);
