import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { Logger, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { RedisIoAdapter } from './redis.adapter';
import { LogsService } from './logs/logs.service';
import { homedir } from 'os';

async function bootstrap() {
  let httpsOptions: Record<string, any> = undefined;
  if (process.env.SERVER_HTTPS === 'true') {
    httpsOptions = {
      key: fs.readFileSync(process.env.SERVER_HTTPS_KEY),
      cert: fs.readFileSync(process.env.SERVER_HTTPS_CRT)
    };
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    httpsOptions
  });

  app.resolve(LogsService).then(res => app.useLogger(res));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    exposedHeaders: 'Content-Disposition'
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL
  });

  const config = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME} Docs`)
    .setVersion('1.0')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      methodKey = methodKey.replace(/([a-z])([A-Z])/g, '$1 $2');
      methodKey = methodKey.charAt(0).toUpperCase() + methodKey.slice(1);
      return methodKey;
    }
  };

  const document = SwaggerModule.createDocument(app, config, swaggerOptions);

  const publicDir = path.join(__dirname, '../public/docs');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(__dirname, '../public/docs/openapi.json'), JSON.stringify(document));
  //SwaggerModule.setup('docs', app, document);

  try {
    await app.listen(process.env.SERVER_HTTP_PORT, process.env.SERVER_HTTP_HOSTNAME);
  } catch (e) {
    console.log(e);
    process.exit(0);
  }

  var dir = path.join(homedir(), process.env.FILES_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
    // @ts-ignore
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
