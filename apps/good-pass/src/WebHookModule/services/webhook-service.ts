import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WebhookService {
  constructor(private readonly configService: ConfigService) {}

  async processWebhook(body: any) {
    console.log("📩 Webhook received....");
    console.log("📦 Payload:", JSON.stringify(body, null, 2));

    // Example validation
    if (!body.event) {
      throw new Error("Invalid webhook payload: 'event' field missing");
    }

    // Example processing
    if (body.event === "payment.succeeded") {
      console.log("✅ Payment succeeded for:", body.event);
    }

    return {
      success: true,
      message: "Webhook processed successfully",
      event: body.event,
    };
  }
}
