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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
let WebhookService = class WebhookService {
    constructor(configService) {
        this.configService = configService;
        // Initialize Stripe once with your secret key
        this.stripe = new stripe_1.default(this.configService.get("STRIPE_SECRET_KEY") || "");
    }
    processWebhook(req) {
        const sig = req.headers["stripe-signature"];
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(req.body, // Must be raw body
            sig, this.configService.get("STRIPE_WEBHOOK_SECRET") || "");
        }
        catch (err) {
            throw new Error(`Signature verification failed: ${err.message}`);
        }
        let session = null;
        if (event.type === "checkout.session.completed") {
            session = event.data.object;
            console.log("✅ Payment succeeded:", session.metadata);
        }
        return { received: true, session };
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WebhookService);
