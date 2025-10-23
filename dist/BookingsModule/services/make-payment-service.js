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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakePaymentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
let MakePaymentService = class MakePaymentService {
    constructor(configService) {
        this.configService = configService;
        // Initialize Stripe once with your secret key
        this.stripe = new stripe_1.default(this.configService.get("STRIPE_SECRET_KEY") || "");
    }
    async makePayment(orderCode, successUrl, cancelUrl, token) {
        var _a;
        const env = this.configService.get("NODE_ENV");
        let baseUrl;
        if (env === "DEVELOPMENT") {
            baseUrl = this.configService.get("LOCAL_HOST");
        }
        else {
            baseUrl = this.configService.get("SERVER_HOST");
        }
        console.log("::::::Base url::::", baseUrl);
        const options = {
            method: "GET",
            url: `${baseUrl}/api/retrieveBookingDetails?orderCode=${orderCode}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            // Step 1️⃣ - Get booking details from your API
            const { data } = await axios_1.default.request(options);
            if (!data.name || !data.email || !data.mobile) {
                throw new common_1.HttpException("Update Customer details in booking and then try to make payment.", common_1.HttpStatus.BAD_REQUEST);
            }
            // Step 2️⃣ - Create Stripe Checkout session
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: data.currency || "AED",
                            product_data: { name: `Order ${orderCode}` },
                            unit_amount: Math.round(data.netTotal * 100), // Stripe expects smallest currency unit
                        },
                        quantity: ((_a = data.items) === null || _a === void 0 ? void 0 : _a.length) || 1,
                    },
                ],
                mode: "payment",
                success_url: successUrl,
                cancel_url: cancelUrl,
                metadata: {
                    orderCode,
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    currency: data.currency,
                    netTotal: data.netTotal.toString(),
                    items: JSON.stringify(data.items.map((item) => ({
                        productId: item.productId,
                        optionId: item.optionId,
                        dateSlotId: item.dateSlotId,
                        ticketItems: item.ticketItems,
                    }))),
                },
            });
            // Step 3️⃣ - Return Stripe checkout URL to controller
            return { sessionUrl: session.url };
        }
        catch (error) {
            if (error.response ===
                "Update Customer details in booking and then try to make payment.") {
                throw new common_1.HttpException("Update Customer details in booking and then try to make payment.", common_1.HttpStatus.BAD_REQUEST);
            }
            else
                throw new common_1.HttpException("Something went wrong, Please try again later", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MakePaymentService = MakePaymentService;
exports.MakePaymentService = MakePaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MakePaymentService);
