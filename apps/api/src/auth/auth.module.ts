import oauthPlugin from "@fastify/oauth2";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD, HttpAdapterHost } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { FastifyInstance } from "fastify";

import { UsersModule } from "../users/users.module";
import {
  GOOGLE_CLIENT,
  JWT_SECRET,
  MICROSOFT_CLIENT,
  WEB_APP_URL,
} from "./auth.constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { OAuth2Service } from "./oauth2.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET),
        signOptions: { expiresIn: "1h" },
      }),
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
  constructor(
    private readonly configService: ConfigService,
    private readonly app: HttpAdapterHost
  ) {
    this.instance = app.httpAdapter.getInstance();
    this.registerMicrosoftOAuthPlugin();
    this.registerGoogleOAuthPlugin();
  }

  private registerMicrosoftOAuthPlugin() {
    const webAppURL = this.configService.get<string>(WEB_APP_URL);
    const id = this.configService.get<string>(MICROSOFT_CLIENT.ID);
    const secret = this.configService.get<string>(MICROSOFT_CLIENT.SECRET);

    this.instance.register(oauthPlugin, {
      name: "microsoftOAuth2",
      scope: ["openid", "email", "profile"],
      credentials: {
        client: { id, secret },
        auth: oauthPlugin.MICROSOFT_CONFIGURATION,
      },
      startRedirectPath: "/auth/microsoft",
      callbackUri: `${webAppURL}/auth/callback/microsoft`,
    });
  }

  private registerGoogleOAuthPlugin() {
    const webAppURL = this.configService.get<string>(WEB_APP_URL);
    const id = this.configService.get<string>(GOOGLE_CLIENT.ID);
    const secret = this.configService.get<string>(GOOGLE_CLIENT.SECRET);

    this.instance.register(oauthPlugin, {
      name: "googleOAuth2",
      scope: ["email", "profile"],
      credentials: {
        client: { id, secret },
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
      },
      startRedirectPath: "/auth/google",
      callbackUri: `${webAppURL}/auth/callback/google`,
    });
  }
}
