import { IsString, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class RetrieveBookingDetailsDto {
  @IsString()
  @IsNotEmpty({ message: "OrderCode is required" })
  orderCode!: string;
}
