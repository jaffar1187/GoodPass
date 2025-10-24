import { IsString, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class UpdateCustomerDetailsDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "Mobile number is required" })
  @Matches(/^\d{10}$/, { message: "Mobile number must be 10 digits" })
  mobile!: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;
}
