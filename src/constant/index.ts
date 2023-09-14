import { PaperFormat } from 'puppeteer-core';

export const envFilePaths = [
  '.env.development',
  '.env.test',
  '.env.staging',
  '.env.production',
];

export const envHostSwagger = {
  development: 'dev',
  test: 'test',
  staging: 'stag',
  production: 'prod',
};

export const DATE_FORMAT = 'YYYYMMDD';
export const APP_YEAR_MONTH_FORMAT = 'YYYY/MM';

export const TEMPLATE_KEY = {
  RECEIPT_DETAIL: 'receipt_detail',
  INVOICE: 'invoice',
};

export const PAGE_FORMAT = {
  A4: 'a4' as PaperFormat,
  A3: 'a3' as PaperFormat,
};

export const ReturnDestinations = [
  {
    value: 1,
    label: '医師',
  },
  {
    value: 2,
    label: '事務',
  },
  {
    value: 3,
    label: '両方',
  },
];

export const StatusCheckFlags = [
  {
    value: 1,
    label: '済み、',
  },
  {
    value: 2,
    label: '未実施、',
  },
  {
    value: 3,
    label: '保留',
  },
];

export enum GenderClassificationEnum {
  MAN = 1,
  WOMAN,
}

export const getGenderClassification = (gender_classification: number) => {
  switch (gender_classification) {
    case GenderClassificationEnum.MAN:
      return '男';
    case GenderClassificationEnum.WOMAN:
      return '女';
    default:
      return '';
  }
};
