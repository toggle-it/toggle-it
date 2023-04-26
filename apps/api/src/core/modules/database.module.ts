import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGODB_URI } from "@ti/config";

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
