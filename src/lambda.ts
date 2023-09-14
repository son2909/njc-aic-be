import { useContainer } from 'typeorm';
import { Callback, Context, Handler } from 'aws-lambda';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envHostSwagger } from './constant';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { HTTPLoggingInterceptor } from './interceptors/request.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ValidationConfig } from './config/validation.config';
import { ValidatorModule } from './validators/validator.module';
import { NestExpressApplication } from '@nestjs/platform-express';

let server: Handler;

async function bootstrapServer(): Promise<Handler> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    logger: false,
  });
  app.enableCors();

  app.use(loggerMiddleware);
  app.useGlobalInterceptors(new HTTPLoggingInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  app.setViewEngine('ejs');

  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('API DOCS')
    .setDescription('The order API description')
    .setVersion('1.0')
    .addServer(`${process.env.HOST}${envHostSwagger[process.env.NODE_ENV]}`)
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapServer());
  return server(event, context, callback);
};
