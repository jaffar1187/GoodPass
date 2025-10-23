"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCall = apiCall;
const common_1 = require("@nestjs/common");
function apiCall(authHeader, url) {
    if (!authHeader) {
        throw new common_1.HttpException("Authorization token is missing", common_1.HttpStatus.UNAUTHORIZED);
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            throw new Error("Invalid authorization header");
        }
        return token.trim();
    }
}
