import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { MESSAGES, REFRESH_TOKEN_SECRET } from "./auth.constants";
import { RequestUser } from "./auth.types";
import { signInDto } from "./dto/auth-signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(user: CreateUserDto) {
    const account = await this.usersService.findOneByEmail(user.email);
    if (account) throw new BadRequestException(MESSAGES.alreadyExist.email);

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

    return this.jwtService.sign(payload, { expiresIn: "30m" });
  }

  issueRefreshToken(user: RequestUser) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      expiresIn: "30d",
      jwtid: user.id,
      secret: this.configService.get<string>(REFRESH_TOKEN_SECRET),
    });
  }
}
