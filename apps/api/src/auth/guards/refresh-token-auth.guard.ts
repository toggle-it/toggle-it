import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { REFRESH_TOKEN_KEY } from "../auth.constants";

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(REFRESH_TOKEN_KEY) {}
