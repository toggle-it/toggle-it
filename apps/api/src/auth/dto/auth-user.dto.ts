import { Expose, Type } from "class-transformer";

import { UserDto } from "../../users/dto/user.dto";

export class AuthUserDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}
