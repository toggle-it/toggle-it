import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_SECRET } from "@ti/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { PayloadJWT, RequestUser } from "../auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies["jwt"],
      ]),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(payload: PayloadJWT): RequestUser {
    return { id: payload.sub };
  }
}
