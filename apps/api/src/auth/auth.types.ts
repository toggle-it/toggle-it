declare module "fastify" {
  export interface FastifyRequest {
    user?: RequestUser;
  }
}

export interface RequestUser extends Omit<PayloadJWT, "sub"> {
  id: string;
}

export interface PayloadJWT {
  sub: string;
}
