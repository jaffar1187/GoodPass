// src/bookings/dto/get-available-dates.dto.ts
import { IsNotEmpty, IsString, IsDateString } from "class-validator";

export class GetAvailaibleSlotsDetailsDto {
  @IsString()
  @IsNotEmpty({ message: "productId is required" })
  productId!: string;

  @IsDateString()
  @IsNotEmpty({ message: "Date is required." })
  date!: string;
}
