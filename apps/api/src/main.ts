import fastifyCookie from "@fastify/cookie";
import helmet from "@fastify/helmet";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ENABLE_SWAGGER_UI, GLOBAL_PREFIX, JWT_SECRET, WEB_APP_URL } from "@ti/config";

import pkg from "../package.json";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors({ origin: WEB_APP_URL, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.register(fastifyCookie, { secret: JWT_SECRET }); // share same secret with JWT

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

  if (ENABLE_SWAGGER_UI) {
    const config = new DocumentBuilder()
      .setTitle(pkg.name)
      .setVersion(pkg.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("doc", app, document, { useGlobalPrefix: true });
  }

  await app.listen(3000, "0.0.0.0");
}

bootstrap();
