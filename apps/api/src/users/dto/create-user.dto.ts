import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  given_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  family_name: string;

  @ApiProperty()
  @IsString()
  password: string;
}
