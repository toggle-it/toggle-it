import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";

export const ThrottleProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
