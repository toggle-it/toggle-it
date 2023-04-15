import { Injectable } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { FastifyInstance, FastifyRequest } from "fastify";

import { GoogleProfile, MicrosoftProfile } from "./auth.types";

@Injectable()
export class OAuth2Service {
  private readonly instance: FastifyInstance;
  constructor(private readonly app: HttpAdapterHost) {
    this.instance = app.httpAdapter.getInstance();
  }

  async getGoogleProfile(req: FastifyRequest) {
    const result =
      await this.instance.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${result.token.access_token}` },
    });

    const user: GoogleProfile = await response.json();
    return { ...user, ...result };
  }

  async getMicrosoftProfile(req: FastifyRequest) {
    const result =
      await this.instance.microsoftOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const response = await fetch("https://graph.microsoft.com/oidc/userinfo", {
      headers: { Authorization: `Bearer ${result.token.access_token}` },
    });

    const user: MicrosoftProfile = await response.json();
    return { ...user, ...result };
  }
}
