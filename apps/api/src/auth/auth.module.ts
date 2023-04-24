import oauthPlugin from "@fastify/oauth2";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD, HttpAdapterHost } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { FastifyInstance } from "fastify";

import { UsersModule } from "../users/users.module";
import { CLIENT, EXPIRY, GLOBAL_PREFIX, JWT_SECRET, WEB_APP_URL } from "./auth.constants";
import { AuthController } from "./auth.controller";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./services/auth.service";
import { OAuth2Service } from "./services/oauth2.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET),
        signOptions: { expiresIn: EXPIRY.ACCESS_TOKEN },
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
    const globlaPrefix = this.configService.get<string>(GLOBAL_PREFIX);
    const webAppURL = this.configService.get<string>(WEB_APP_URL);
    const id = this.configService.get<string>(CLIENT.MICROSOFT.ID);
    const secret = this.configService.get<string>(CLIENT.MICROSOFT.SECRET);

    this.instance.register(oauthPlugin, {
      name: "microsoftOAuth2",
      scope: ["openid", "email", "profile"],
      credentials: {
        client: { id, secret },
        auth: oauthPlugin.MICROSOFT_CONFIGURATION,
      },
      startRedirectPath: `/${globlaPrefix}/auth/microsoft`,
      callbackUri: `${webAppURL}/auth/callback/microsoft`,
    });
  }

  private registerGoogleOAuthPlugin() {
    const globlaPrefix = this.configService.get<string>(GLOBAL_PREFIX);
    const webAppURL = this.configService.get<string>(WEB_APP_URL);
    const id = this.configService.get<string>(CLIENT.GOOGLE.ID);
    const secret = this.configService.get<string>(CLIENT.GOOGLE.SECRET);

    this.instance.register(oauthPlugin, {
      name: "googleOAuth2",
      scope: ["email", "profile"],
      credentials: {
        client: { id, secret },
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
      },
      startRedirectPath: `/${globlaPrefix}/auth/google`,
      callbackUri: `${webAppURL}/auth/callback/google`,
    });
  }
}
