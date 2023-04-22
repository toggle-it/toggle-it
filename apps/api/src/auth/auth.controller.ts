import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";

import { Serialize } from "../core/interceptors";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Public, RefreshTokenGuard } from "./auth.decorators";
import { signInDto } from "./dto/auth-signin.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { SetAuthCookie } from "./interceptors/auth-cookie.interceptor";
import { AuthService } from "./services/auth.service";

@ApiTags("Authentication")
@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post("login")
  @SetAuthCookie()
  @Serialize(AuthUserDto)
  async login(@Body() user: signInDto) {
    return this.authService.signIn(user);
  }

  @Get("logout")
  @SetAuthCookie(false)
  logout() {
    return { logged_out: true };
  }

  @Post("verify-account")
  async verifyAccount() {}

  @RefreshTokenGuard()
  @ApiBearerAuth()
  @Get("refresh")
  refresh(@Req() { user }: FastifyRequest) {
    const token = this.authService.issueAccessToken(user);
    return { token: { access_token: token } };
  }

  @Get("callback/google")
  @SetAuthCookie()
  async googleAuthRedirect(@Req() request: FastifyRequest) {
    return this.authService.googleOAuth2(request);
  }

  @Get("callback/microsoft")
  @SetAuthCookie()
  async microsoftAuthRedirect(@Req() request: FastifyRequest) {
    return this.authService.microsoftOAuth2(request);
  }
}
