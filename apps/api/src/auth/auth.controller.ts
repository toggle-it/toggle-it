import { Body, Controller, Post } from "@nestjs/common";

import { Public } from "../core/decorators";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { signInDto } from "./dto/auth-signin.dto";

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post("signin")
  async signIn(@Body() user: signInDto) {
    return this.authService.signIn(user);
  }

  @Post("verify-request")
  async verifyRequest() {}
}
