// src/app.module.ts
import { BookingsModule } from "./BookingsModule/bookings-module";
import { WebhookModule } from "./WebHookModule/webhooks-module";
import { Module } from "@nestjs/common";

// import { WebhookModule } from "./webhook/webhook.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    // Loads .env variables
    ConfigModule.forRoot({
      isGlobal: true, // ✅ makes env vars available app-wide
    }),

    BookingsModule,
    WebhookModule,
  ],
})
export class AppModule {}
