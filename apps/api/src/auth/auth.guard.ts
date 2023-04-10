import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { FastifyRequest } from "fastify";

import { IS_PUBLIC_KEY } from "../core/decorators";
import { PayloadJWT } from "./auth.types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  private extractTokenFromHeader(request: FastifyRequest): string | null {
    const [type, token] = request.headers.authorization?.split(" ") || [];
    return type === "Bearer" ? token : null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true; //💡 Skip token verification for public routes

    const request = context.switchToHttp().getRequest() as FastifyRequest;
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload: PayloadJWT = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      request.user = payload; //💡 Assign payload to the request.user so it can be accessible in route handlers
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
