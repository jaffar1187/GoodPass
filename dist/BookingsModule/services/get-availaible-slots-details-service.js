"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailaibleSlotsDetailsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let GetAvailaibleSlotsDetailsService = class GetAvailaibleSlotsDetailsService {
    async getAvailaibleSlotsDetails(productId, date, token) {
        const options = {
            method: "GET",
            url: `https://partner-api.goodpass.club/v1/products/${productId}/prices`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { date },
        };
        // 4️⃣ Send API call
        try {
            const { data } = await axios_1.default.request(options);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException("Failed to fetch available slots details", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.GetAvailaibleSlotsDetailsService = GetAvailaibleSlotsDetailsService;
exports.GetAvailaibleSlotsDetailsService = GetAvailaibleSlotsDetailsService = __decorate([
    (0, common_1.Injectable)()
], GetAvailaibleSlotsDetailsService);
