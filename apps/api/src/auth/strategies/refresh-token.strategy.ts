import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { REFRESH_TOKEN_SECRET } from "@ti/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { REFRESH_TOKEN_KEY } from "../auth.constants";
import { PayloadJWT, RequestUser } from "../auth.types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_KEY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: REFRESH_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(payload: PayloadJWT): RequestUser {
    return { id: payload.sub };
  }
}
