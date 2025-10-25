import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
} from "@nestjs/common";
import { WebhookService } from "../services/webhook-service";
import { getCache } from "./../../common/redis";

@Controller("webhook")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @UsePipes()
  async handleWebhook(@Body() body: any) {
    console.log("📩 Webhook received....", body.type);

    try {
      // ✅ Only handle payment success events
      if (body.type === "payment.succeeded") {
        const orderCode = body?.data?.orderCode;

        if (!orderCode) {
          console.warn("⚠️ Missing orderCode in webhook payload");
        } else {
          // ✅ Retrieve cached reference number
          const referenceNumber = await getCache(orderCode);

          if (referenceNumber) {
            console.log(
              `🧠 Retrieved from cache: ${orderCode} → ${referenceNumber}`
            );
            // ✅ Attach to webhook body before forwarding
            body.cachedReference = referenceNumber;
          } else {
            console.warn(`⚠️ No cache found for orderCode: ${orderCode}`);
          }
        }
      } else {
        // Ignore other event types
        return {
          statusCode: HttpStatus.OK,
          success: true,
        };
      }

      // ✅ Forward enriched payload to service
      const result = await this.webhookService.processWebhook(body);

      console.log("::::Confirm-booking-data:::", result);

      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Webhook processed successfully",
        data: result,
      };
    } catch (err: any) {
      console.error("❌ Webhook error:", err.message);
      throw new HttpException(
        { success: false, message: err.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
