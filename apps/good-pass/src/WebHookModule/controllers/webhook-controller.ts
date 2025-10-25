import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
} from "@nestjs/common";
import { WebhookService } from "../services/webhook-service";

@Controller("webhook")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @UsePipes()
  async handleWebhook(@Body() body: any) {
    console.log("📩 Webhook received....");
    try {
      const result = await this.webhookService.processWebhook(body);
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
