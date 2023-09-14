import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';
import { AppModule } from './app.module';
import { UkeImportService } from './modules/uke/uke-import.service';
let app: INestApplicationContext;
export const handler = async (event: any): Promise<APIGatewayProxyResult> => {
  app =
    app ??
    (await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    }));
  const ukeImportService = app.get(UkeImportService);

  const { fileKey, authUser, body, type } = event.data;
  console.log('START: proccessImportUke');

  switch (type) {
    case 'Medical':
      await ukeImportService.proccessImportUke(fileKey, authUser, body);
      break;
    case 'DPC':
      await ukeImportService.proccessImportDpcUke(fileKey, authUser, body);
      break;

    default:
      break;
  }

  console.log('END: proccessImportUke');
  return {
    statusCode: 200,
    body: JSON.stringify('Success'),
  };
};
