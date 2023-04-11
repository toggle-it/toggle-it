import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { Serialize } from "src/core/interceptors";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { Public, UseRefreshTokenGuard } from "./auth.decorators";
import { AuthService } from "./auth.service";
import { signInDto } from "./dto/auth-signin.dto";
import { AuthUserDto } from "./dto/auth-user.dto";

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post("signin")
  @Serialize(AuthUserDto)
  async signIn(@Body() user: signInDto) {
    return this.authService.signIn(user);
  }

  @Post("verify-account")
  async verifyAccount() {}

  @UseRefreshTokenGuard()
  @ApiBearerAuth()
  @Post("refresh")
  refresh(@Req() { user }: FastifyRequest) {
    const token = this.authService.issueAccessToken(user);
    return { access_token: token };
  }
}
