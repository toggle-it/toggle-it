import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { FastifyRequest } from "fastify";

import { MESSAGES } from "../core/constants";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserDocument } from "../users/schemas/user.schema";
import { UsersService } from "../users/users.service";
import { REFRESH_TOKEN_SECRET } from "./auth.constants";
import { RequestUser } from "./auth.types";
import { signInDto } from "./dto/auth-signin.dto";
import { OAuth2Service } from "./oauth2.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly oauth2: OAuth2Service
  ) {}

  async signUp(user: CreateUserDto) {
    const account = await this.usersService.queryOneByEmail(user.email);

    if (account) {
      this.mailPasswordResetLink(account);
      throw new BadRequestException(MESSAGES.alreadyExist.email);
    }

    const password = await bcrypt.hash(user.password, 10);
    return this.usersService.create({ ...user, password });
  }

  async signIn({ email, password }: signInDto) {
    const user = await this.usersService.findOneByEmail(email);
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException(MESSAGES.incorrect.password);

    const userId = user._id.toHexString();
    const payload: RequestUser = { id: userId };

    return {
      user,
      access_token: this.issueAccessToken(payload),
      refresh_token: this.issueRefreshToken(payload),
    };
  }

  issueAccessToken(user: RequestUser) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload);
  }

  issueRefreshToken(user: RequestUser) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      expiresIn: "30d",
      jwtid: user.id,
      secret: this.configService.get<string>(REFRESH_TOKEN_SECRET),
    });
  }

  mailPasswordResetLink(user: UserDocument) {
    //TODO: Send email to reset password link
    return user;
  }

  async googleOAuth2(request: FastifyRequest) {
    const profile = await this.oauth2.getGoogleProfile(request);
    return profile;
  }

  async microsoftOAuth2(request: FastifyRequest) {
    const profile = await this.oauth2.getMicrosoftProfile(request);
    return profile;
  }
}
