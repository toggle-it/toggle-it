import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { REFRESH_TOKEN_KEY, REFRESH_TOKEN_SECRET } from "../auth.constants";
import { PayloadJWT, RequestUser } from "../auth.types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_KEY) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(REFRESH_TOKEN_SECRET),
      ignoreExpiration: false,
    });
  }

  validate(payload: PayloadJWT): RequestUser {
    return { id: payload.sub };
  }
}
