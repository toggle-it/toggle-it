import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import ms from "ms";
import { tap } from "rxjs";

import { EXPIRY, JWT_KEY } from "../auth.constants";

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
  constructor(private readonly set: boolean) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const response: FastifyReply = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((data) => {
        // Set the cookie header
        if (this.set) {
          response.setCookie(JWT_KEY, data.token.access_token, {
            maxAge: ms(EXPIRY.REFRESH_TOKEN),
            priority: "high",
            httpOnly: true,
            secure: true,
            path: "/",
          });
        } else {
          response.clearCookie(JWT_KEY);
        }
      })
    );
  }
}

export function SetAuthCookie(set?: boolean) {
  return UseInterceptors(new AuthCookieInterceptor(set ?? true));
}
