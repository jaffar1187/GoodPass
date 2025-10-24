// src/bookings/dto/get-available-dates.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsObject,
  IsArray,
  IsNumber,
  Min,
  IsOptional,
} from "class-validator";

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: "productId is required" })
  productId!: string;

  @IsDateString(
    {},
    { message: "date must be a valid ISO date string (YYYY-MM-DD)" }
  )
  @IsNotEmpty({ message: "date is required" })
  date!: string;

  @IsObject({
    message:
      "ticketSelections must be an object with ticket IDs as keys and quantities as values",
  })
  @IsNotEmpty({ message: "ticketSelections is required" })
  ticketSelections!: Record<string, number>;

  @IsArray({ message: "addonSelections must be an array" })
  @IsOptional()
  addonSelections?: string[];

  @IsString()
  @IsNotEmpty({ message: "option is required" })
  option!: string;

  @IsString()
  @IsNotEmpty({ message: "slot is required" })
  slot!: string;

  @IsNumber()
  @Min(0, { message: "total must be a positive number" })
  total!: number;

  @IsString()
  @IsNotEmpty({ message: "currency is required" })
  currency!: string;
}
