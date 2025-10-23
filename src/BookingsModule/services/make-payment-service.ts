import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class MakePaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    // Initialize Stripe once with your secret key
    this.stripe = new Stripe(
      this.configService.get<string>("STRIPE_SECRET_KEY") || ""
    );
  }

  async makePayment(
    orderCode: string,
    successUrl: string,
    cancelUrl: string,
    token: string
  ): Promise<any> {
    const env = this.configService.get("NODE_ENV");
    let baseUrl;

    if (env === "DEVELOPMENT") {
      baseUrl = this.configService.get("LOCAL_HOST");
    } else {
      baseUrl = this.configService.get("SERVER_HOST");
    }

    const options = {
      method: "GET",
      url: `${baseUrl}/api/retrieveBookingDetails?orderCode=${orderCode}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Step 1️⃣ - Get booking details from your API
      const { data } = await axios.request(options);
      if (!data.name || !data.email || !data.mobile) {
        throw new HttpException(
          "Update Customer details in booking and then try to make payment.",
          HttpStatus.BAD_REQUEST
        );
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
            quantity: data.items?.length || 1,
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
          items: JSON.stringify(
            data.items.map((item: any) => ({
              productId: item.productId,
              optionId: item.optionId,
              dateSlotId: item.dateSlotId,
              ticketItems: item.ticketItems,
            }))
          ),
        },
      });

      // Step 3️⃣ - Return Stripe checkout URL to controller
      return { sessionUrl: session.url };
    } catch (error: any) {
      if (
        error.response ===
        "Update Customer details in booking and then try to make payment."
      ) {
        throw new HttpException(
          "Update Customer details in booking and then try to make payment.",
          HttpStatus.BAD_REQUEST
        );
      } else
        throw new HttpException(
          "Something went wrong, Please try again later",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
  }
}
