import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import Stripe from "stripe";

@Injectable()
export class WebhookService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    // Initialize Stripe once with your secret key
    this.stripe = new Stripe(
      this.configService.get<string>("STRIPE_SECRET_KEY") || ""
    );
  }

  async processWebhook(req: any) {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body, // Must be raw body
        sig,
        this.configService.get<string>("STRIPE_WEBHOOK_SECRET") || ""
      );
    } catch (err: any) {
      throw new Error(`Signature verification failed: ${err.message}`);
    }

    let session = null;
    if (event.type === "checkout.session.completed") {
      session = event.data.object;
      console.log("✅ Payment succeeded:", session);
    }

    return { received: true, session };
  }
}
