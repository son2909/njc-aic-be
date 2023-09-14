import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';
import { AppModule } from './app.module';
import { ReceiptInformationService } from './modules/receipt-information/receipt-information.service';
let app: INestApplicationContext;
export const handler = async (event: any): Promise<APIGatewayProxyResult> => {
  app =
    app ??
    (await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    }));
  const receiptInformationService = app.get(ReceiptInformationService);

  const { receiptIds, zipName } = event.data;
  console.log('START: proccess export zip');

  await receiptInformationService.exportAllReceipt(receiptIds, zipName);

  console.log('END: proccess export zip');
  return {
    statusCode: 200,
    body: JSON.stringify('Success'),
  };
};
