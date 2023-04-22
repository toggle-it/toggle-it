import { Expose } from "class-transformer";

export class AuthTokenDto {
  @Expose()
  access_token: string;

  @Expose()
  refresh_token?: string;
}
