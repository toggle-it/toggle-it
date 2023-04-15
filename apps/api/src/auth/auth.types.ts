import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
  interface FastifyRequest {
    user?: RequestUser;
  }
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    microsoftOAuth2: OAuth2Namespace;
  }
}

export interface RequestUser extends Omit<PayloadJWT, "sub"> {
  id: string;
}

export interface PayloadJWT {
  sub: string;
}

export interface GoogleProfile {
  id: string;
  name: string;
  email: string;
  locale: string;
  picture: string;
  given_name: string;
  family_name: string;
  verified_email: boolean;
}

export interface MicrosoftProfile {
  sub: string;
  email: string;
  locale: string;
  picture: string; // "https://graph.microsoft.com/v1.0/me/photo/$value"
  givenname: string;
  familyname: string;
}
