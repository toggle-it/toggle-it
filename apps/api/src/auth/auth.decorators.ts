import { Res, SetMetadata, UseGuards } from "@nestjs/common";

import { IS_PUBLIC_KEY } from "./auth.constants";
import { RefreshTokenAuthGuard } from "./guards/refresh-token-auth.guard";

export const Reply = () => Res({ passthrough: true });

export const RefreshTokenGuard = () => UseGuards(RefreshTokenAuthGuard);

export const Public = (value?: boolean) => SetMetadata(IS_PUBLIC_KEY, value ?? true);
