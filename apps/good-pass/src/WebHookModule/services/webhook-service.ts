import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WebhookService {
  constructor(private readonly configService: ConfigService) {}

  async processWebhook(body: any) {
    console.log("📦 Payload:", JSON.stringify(body, null, 2));

    // Example processing
    if (body.type === "payment.succeeded") {
      console.log("✅ Payment succeeded for:", body.type);
    }

    return {
      success: true,
      message: "Webhook processed successfully",
      event: body,
    };
  }
}
