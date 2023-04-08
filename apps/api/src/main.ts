import auth from "@fastify/auth";
import cookie from "@fastify/cookie";
import helmet from "@fastify/helmet";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import pkg from "package.json";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const configService = app.get(ConfigService);

  await app.register(auth);
  await app.register(cookie);
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  const config = new DocumentBuilder().setTitle(pkg.name).setVersion(pkg.version).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document, { useGlobalPrefix: true });

  await app.listen(configService.get("PORT"));
}

bootstrap();
