import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerModule as NestThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    NestThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: 60,
        limit: configService.get("MAX_REQUESTS_PER_MINUTE"),
      }),
    }),
  ],
  exports: [NestThrottlerModule],
})
export class ThrottlerModule {}
