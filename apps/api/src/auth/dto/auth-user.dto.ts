import { Expose, Type } from "class-transformer";

import { UserDto } from "../../users/dto/user.dto";
import { AuthTokenDto } from "./auth-token.dto";

export class AuthUserDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => AuthTokenDto)
  token: AuthTokenDto;
}
