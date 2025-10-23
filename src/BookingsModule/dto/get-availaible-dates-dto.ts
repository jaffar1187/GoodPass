// src/bookings/dto/get-available-dates.dto.ts
import { IsNotEmpty, IsString } from "class-validator";

export class GetAvailableDatesDto {
  @IsString()
  @IsNotEmpty({ message: "productId is required" })
  productId!: string;
}
