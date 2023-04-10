import { Types } from "mongoose";

declare module "fastify" {
  export interface FastifyRequest {
    user?: PayloadJWT;
  }
}

export type PayloadJWT = {
  sub: Types.ObjectId;
};
