import oauthPlugin from "@fastify/oauth2";
import { Module } from "@nestjs/common";
import { APP_GUARD, HttpAdapterHost } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { GLOBAL_PREFIX, JWT_SECRET, OAUTH2_CLIENT, WEB_APP_URL } from "@ti/config";
import { FastifyInstance } from "fastify";

import { UsersModule } from "../users/users.module";
import { EXPIRY } from "./auth.constants";
import { AuthController } from "./auth.controller";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./services/auth.service";
import { OAuth2Service } from "./services/oauth2.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: EXPIRY.ACCESS_TOKEN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    OAuth2Service,
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {
  private readonly instance: FastifyInstance;
  constructor(private readonly app: HttpAdapterHost) {
    this.instance = app.httpAdapter.getInstance();
    this.registerMicrosoftOAuthPlugin();
    this.registerGoogleOAuthPlugin();
  }

  private registerMicrosoftOAuthPlugin() {
    this.instance.register(oauthPlugin, {
      name: "microsoftOAuth2",
      scope: ["openid", "email", "profile"],
      credentials: {
        auth: oauthPlugin.MICROSOFT_CONFIGURATION,
        client: {
          id: OAUTH2_CLIENT.MICROSOFT.CLIENT_ID,
          secret: OAUTH2_CLIENT.MICROSOFT.CLIENT_SECRET,
        },
      },
      startRedirectPath: `${GLOBAL_PREFIX}/auth/microsoft`,
      callbackUri: `${WEB_APP_URL}/auth/callback/microsoft`,
    });
  }

  private registerGoogleOAuthPlugin() {
    this.instance.register(oauthPlugin, {
      name: "googleOAuth2",
      scope: ["email", "profile"],
      credentials: {
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
        client: {
          id: OAUTH2_CLIENT.GOOGLE.CLIENT_ID,
          secret: OAUTH2_CLIENT.GOOGLE.CLIENT_SECRET,
        },
      },
      startRedirectPath: `${GLOBAL_PREFIX}/auth/google`,
      callbackUri: `${WEB_APP_URL}/auth/callback/google`,
    });
  }
}
