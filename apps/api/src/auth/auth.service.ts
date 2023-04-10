import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { PayloadJWT } from "./auth.types";
import { signInDto } from "./dto/auth-signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(user: CreateUserDto) {
    const account = await this.usersService.findOneByEmail(user.email);
    if (account) throw new BadRequestException("email in use");

    const password = await bcrypt.hash(user.password, 10);
    return this.usersService.create({ ...user, password });
  }

  async signIn({ email, password }: signInDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException(`account not found`);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException(`incorrect password`);

    const payload: PayloadJWT = { sub: user._id };
    const access_token = await this.jwtService.signAsync(payload);
    return { user, access_token };
  }
}
