import { IsString, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class MakePaymentDto {
  @IsString()
  @IsNotEmpty({ message: "OrderCode is required" })
  orderCode!: string;

  @IsString()
  @IsNotEmpty({ message: "successUrl is required" })
  successUrl!: string;

  @IsString()
  @IsNotEmpty({ message: "cancelUrl is required" })
  cancelUrl!: string;
}
