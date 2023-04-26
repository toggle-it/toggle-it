import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { MAX_REQUESTS_PER_MINUTE } from "@ti/config";

@Module({
  imports: [ThrottlerModule.forRoot({ limit: MAX_REQUESTS_PER_MINUTE, ttl: 60 })],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [ThrottlerModule],
})
export class CustomThrottlerModule {}
