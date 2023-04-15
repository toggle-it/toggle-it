import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { Serialize } from "src/core/interceptors";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { Public, RefreshTokenGuard } from "./auth.decorators";
import { AuthService } from "./auth.service";
import { signInDto } from "./dto/auth-signin.dto";
import { AuthUserDto } from "./dto/auth-user.dto";

@ApiTags("Authentication")
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

  @RefreshTokenGuard()
  @ApiBearerAuth()
  @Get("refresh")
  refresh(@Req() { user }: FastifyRequest) {
    const token = this.authService.issueAccessToken(user);
    return { access_token: token };
  }

  @Get("callback/google")
  async googleAuthRedirect(@Req() request: FastifyRequest) {
    return this.authService.googleOAuth2(request);
  }

  @Get("callback/microsoft")
  async microsoftAuthRedirect(@Req() request: FastifyRequest) {
    return this.authService.microsoftOAuth2(request);
  }
}
