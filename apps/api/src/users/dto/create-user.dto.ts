import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
