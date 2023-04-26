import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CustomThrottlerModule, DatabaseModule } from "./core/modules";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [CustomThrottlerModule, DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
