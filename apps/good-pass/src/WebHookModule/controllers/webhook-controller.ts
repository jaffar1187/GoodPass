import { Controller, Post, Req, Res, HttpStatus } from "@nestjs/common";
import { WebhookService } from "../services/webhook-service";
import { Request, Response } from "express";

@Controller("webhook")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.webhookService.processWebhook(req);
      return res.status(HttpStatus.OK).json(result);
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
