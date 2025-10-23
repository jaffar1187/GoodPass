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
exports.MakePaymentController = void 0;
const common_1 = require("@nestjs/common");
const make_payment_service_1 = require("../services/make-payment-service");
const make_payment_dto_1 = require("../dto/make-payment-dto");
let MakePaymentController = class MakePaymentController {
    constructor(makePaymentService) {
        this.makePaymentService = makePaymentService;
    }
    async makePayment(body, authHeader) {
        // ✅ Header validation
        let { orderCode, successUrl, cancelUrl } = body;
        if (!authHeader) {
            throw new common_1.HttpException({ success: false, message: "Authorization token is missing" }, common_1.HttpStatus.UNAUTHORIZED);
        }
        let token = authHeader.trim();
        if (token.toLowerCase().startsWith("bearer ")) {
            token = token.slice(7).trim(); // remove “Bearer ”
        }
        // ✅ Pass the entire validated DTO and token to your service
        const data = await this.makePaymentService.makePayment(orderCode, successUrl, cancelUrl, token);
        // ✅ Return the same shape your API expects
        return {
            data,
        };
    }
};
exports.MakePaymentController = MakePaymentController;
__decorate([
    (0, common_1.Post)("makePayment"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [make_payment_dto_1.MakePaymentDto, String]),
    __metadata("design:returntype", Promise)
], MakePaymentController.prototype, "makePayment", null);
exports.MakePaymentController = MakePaymentController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [make_payment_service_1.MakePaymentService])
], MakePaymentController);
