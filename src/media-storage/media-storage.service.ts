import { HttpStatus, Injectable } from '@nestjs/common';
import AWS, { AWSError, S3 } from 'aws-sdk';
import { GetObjectOutput, ManagedUpload } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import csvParser from 'csv-parser';
import stream, { Readable } from 'stream';
import { read, utils } from 'xlsx';
import { LoggerService } from '../logger/custom.logger';
import { DataMapUKEType } from '../modules/uke/uke-import.interface';
import { HeaderExportCsvDto } from './dto/header-export-csv.dto';
import moment from 'moment';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import puppeteer, { PaperFormat } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { ApiError } from 'src/filter/api.error';
import archiver from 'archiver';
const iconv = require('iconv-lite');
const readline = require('readline');
const csvWriter = require('csv-writer');

chromium.setGraphicsMode = false;

@Injectable()
export class MediaStorageService {
  private readonly s3: S3;

  private readonly bucket: string;

  private readonly prefix: string;

  private readonly url_expires_in: number;

  constructor(private logger: LoggerService) {
    this.s3 = new S3();
    this.bucket = process.env.S3_BUCKET_NAME;
    this.prefix = process.env.S3_PREFIX;
    this.url_expires_in = +process.env.URL_EXPIRES_IN;
  }

  async uploadBufferToS3(
    buffer: Buffer,
    name: string,
  ): Promise<ManagedUpload.SendData> {
    return this.s3
      .upload({
        Bucket: this.bucket,
        Key: `${this.prefix}/tmp/${name}.xlsx`,
        Body: buffer,
      })
      .promise();
  }

  signedGetObject(
    key: string,
    fileName?: string,
    download?: boolean,
    contentType?: string,
  ): string {
    const params: any = {
      Bucket: this.bucket,
      Key: key,
      Expires: this.url_expires_in,
      ResponseContentDisposition: 'inline',
    };

    if (fileName && download) {
      params.ResponseContentDisposition = `attachment;filename="${encodeURIComponent(
        fileName,
      )}"`;
    }

    if (contentType) {
      params.ResponseContentType = contentType;
    }

    return this.s3.getSignedUrl('getObject', params);
  }

  signedPutObject(
    key: string,
    contentType: string,
    fileName: string,
  ): { url: string; key: string } {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Expires: this.url_expires_in,
      ContentType: contentType,
      ContentDisposition: 'attachment',
    };

    const url = this.s3.getSignedUrl('putObject', params);
    return {
      url,
      key: fileName,
    };
  }

  async deleteObjects(
    bucket: string,
    objects: { Key: string }[],
  ): Promise<PromiseResult<S3.DeleteObjectsOutput, AWSError>> {
    const params = {
      Bucket: bucket,
      Delete: { Objects: objects },
    };

    const result = await this.s3.deleteObjects(params).promise();

    return result;
  }

  async getFileStream(fileKey: string): Promise<NodeJS.ReadableStream> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: `${this.bucket}/${this.prefix}`,
      Key: fileKey,
    };

    const response = await this.s3.getObject(params).promise();
    return response.Body as NodeJS.ReadableStream;
  }

  async getReadStream(fileKey: string): Promise<NodeJS.ReadableStream> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: `${this.bucket}/${this.prefix}`,
      Key: fileKey,
    };

    try {
      const response: GetObjectOutput = await this.s3
        .getObject(params)
        .promise();
      if (response.Body) {
        return Readable.from(response.Body as any);
      } else {
        throw new Error('Empty response body');
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async importDataFromExcel(
    fileKey: string,
    sheetNumber?: number,
  ): Promise<any[]> {
    const fileStream = await this.getFileStream(fileKey);
    const workbook = read(fileStream, { type: 'buffer' });

    const worksheet =
      workbook.Sheets[workbook.SheetNames[sheetNumber ? sheetNumber - 1 : 0]];
    const data: any[] = utils.sheet_to_json(worksheet, { header: 1 });

    if (data.length > 0) {
      data.shift();
    }

    return data;
  }

  async importDataFromCSV(
    fileKey: string,
    readHeader: boolean,
    decodeType?: string,
  ): Promise<any[]> {
    const fileStream = await this.getReadStream(fileKey);
    const data: any[] = [];

    return new Promise((resolve, reject) => {
      fileStream
        .pipe(iconv.decodeStream(decodeType ?? 'Shift_JIS'))
        .pipe(csvParser({ headers: readHeader ? true : false }))
        .on('data', (row: any) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  importDataFromUkeFile = async (fileKey: string) => {
    const dataMap: DataMapUKEType<any> = new Map<string, any[]>();
    let countLine = 0;

    const fileStream = await this.getFileStream(fileKey);
    const fileContent = iconv.decode(fileStream, 'Shift_JIS');
    const readableStream = Readable.from(fileContent);
    const rl = readline.createInterface({
      input: readableStream,
      crlfDelay: Infinity,
    });

    // Process each line of the file
    let current_p_id = null;
    let current_receipt_int = null;
    for await (const line of rl) {
      const arrLine: string[] = line.split(',');
      const tbName = arrLine[0];
      if (tbName.length) {
        if (tbName === 'RE') {
          current_p_id = arrLine[13] ?? null;
          current_receipt_int = arrLine[1] ?? null;
        }

        if (tbName !== 'IR') {
          if (tbName !== 'RE') {
            arrLine.unshift(current_receipt_int);
          }
          arrLine.unshift(current_p_id);
        }
        if (dataMap.has(tbName)) {
          const curData = dataMap.get(tbName);
          curData.push(arrLine);
          dataMap.set(tbName, curData);
        } else {
          dataMap.set(tbName, [arrLine]);
        }
      }
      countLine++;
    }

    return { dataMap, countLine };
  };

  async csvToData(fileKey: string, decodeType?: string): Promise<any[]> {
    const fileStream = await this.getReadStream(fileKey);
    const data: any[] = [];
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(iconv.decodeStream(decodeType ?? 'Shift_JIS'))
        .pipe(
          csvParser({
            mapValues: ({ header, index, value }) =>
              '' === value.trim() ? null : value.trim(),
          }),
        )
        .on('data', (row: any) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  async csvToDataSkipLine(
    fileKey: string,
    skipLine: number,
    decodeType?: string,
  ): Promise<any[]> {
    const fileStream = await this.getReadStream(fileKey);
    const data: any[] = [];
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(iconv.decodeStream(decodeType ?? 'Shift_JIS'))
        .pipe(
          csvParser({
            mapValues: ({ header, index, value }) =>
              '' === value.trim() ? null : value.trim(),
            skipLines: skipLine,
          }),
        )
        .on('data', (row: any) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  async getHeaders(fileKey: string, decodeType?: string): Promise<string[]> {
    const fileStream = await this.getReadStream(fileKey);
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(iconv.decodeStream(decodeType ?? 'Shift_JIS'))
        .pipe(csvParser())
        .on('headers', (headers: any) => {
          resolve(headers);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  async dataToCsv(
    data: object[],
    header: HeaderExportCsvDto[],
  ): Promise<ManagedUpload.SendData> {
    const writer = csvWriter.createObjectCsvStringifier({
      header: header,
    });
    const csvString = writer.stringifyRecords(data);
    return await this.s3
      .upload({
        Bucket: this.bucket,
        Key: `${this.prefix}/master-${moment(new Date()).format(
          'YYYYMMDDHHmmss',
        )}.csv`,
        Body: writer.getHeaderString() + csvString,
        ContentType: 'text/csv',
      })
      .promise();
  }

  async generatePdf(
    htmlContent: string,
    pageFormat: PaperFormat,
  ): Promise<Buffer> {
    const executablePathLocal =
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath:
        process.env.OFFLINE === 'true'
          ? executablePathLocal
          : await chromium.executablePath(),
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: pageFormat,
      printBackground: true,
      omitBackground: true,
    });

    await browser.close();
    return pdfBuffer;
  }

  async generatePdfWithPromise(
    template_key: string,
    data: any,
    filename: string,
    pageFormat: PaperFormat,
  ) {
    const templateContent = await fs.readFile(
      `dist/templates/${template_key}.ejs`,
      'utf-8',
    );
    const html = ejs.render(templateContent, data);
    const pdfBuffer = await this.generatePdf(html, pageFormat);
    const response = await this.s3
      .upload({
        Bucket: this.bucket,
        Key: `${this.prefix}/${filename}`,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
      })
      .promise();
    return {
      url: this.signedGetObject(response?.Key, filename, true),
      filename,
    };
  }

  async uploadBufferToS3DynamicType(
    buffer,
    name: string,
  ): Promise<ManagedUpload.SendData> {
    return this.s3
      .upload({
        Bucket: this.bucket,
        Key: `${this.prefix}/tmp/${name}`,
        Body: buffer,
      })
      .promise();
  }

  async zipFile(
    zipName: string,
    data: { supplier_name: string; name: string; folder: string }[],
  ): Promise<{ url: string }> {
    const key = this.prefix;
    try {
      const files: any[] = data.map((file) => ({
        fileName: file.name,
        key: key + '/' + file.name,
        folder: file.folder,
        type: 'file',
      }));

      const destinationKey = key + '/' + zipName;

      const uploaded = await this.streamToZipInS3(files, destinationKey);

      const presignedUrl = this.signedGetObject(uploaded.Key, zipName, true);

      if (!presignedUrl) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Get Object error');
      }

      return { url: presignedUrl };
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Zip file error');
    }
  }

  async streamToZipInS3(files: any[], destinationKey: string): Promise<any> {
    const zipStream = new stream.PassThrough();
    zipStream.on('error', (err: any) => {
      console.log(err.message);
    });
    const archive = archiver('zip');
    archive.on('error', (err: any) => {
      console.log(err.message);
    });
    archive.pipe(zipStream);
    for (const file of files) {
      if (file['type'] === 'file') {
        const base64 = await this.getStream(file['key']);
        if (base64) {
          archive.append(base64, {
            name: `/${file.folder}/` + file['fileName'],
          });
        }
      }
    }
    archive.finalize();

    return this.uploadZip(destinationKey, zipStream);
  }

  async getStream(key: string): Promise<Buffer> {
    try {
      const obj = await this.s3
        .getObject({
          Bucket: this.bucket,
          Key: key,
        })
        .promise();
      return Buffer.from(obj.Body as any);
    } catch (err) {
      return null;
    }
  }

  async uploadZip(key: string, passthrough): Promise<ManagedUpload.SendData> {
    return this.s3
      .upload(
        {
          Bucket: this.bucket,
          Key: key,
          Body: passthrough,
          ContentType: 'application/zip',
          ServerSideEncryption: 'AES256',
          Expires: moment().add(1).toDate(),
        },
        (err: any) => {
          if (err) {
            throw new Error(err.message);
          }
        },
      )
      .promise();
  }
}
