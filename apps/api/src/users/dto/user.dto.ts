import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  given_name: string;

  @Expose()
  family_name: string;
}
