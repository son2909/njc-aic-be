import { ClassConstructor } from 'class-transformer';
import dayjs from 'dayjs';
import { getConnection } from 'typeorm';

export const convertNumberJP = (numberJP: string) => {
  return Number(
    numberJP.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0),
    ),
  );
};

export const convertNumberJPToNumeric = (numberJP: string) => {
  return numberJP.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
};

export const numberToDate = (
  value: number,
  format: string = 'YYYYMM',
): Date => {
  if (!value) return null;
  const valueStr = value + '';
  return dayjs(valueStr, format).toDate();
};

export const strToDate = (
  value: string,
  format: string = DATE_FORMAT.YYYYMMDD_HHMMSS,
): Date => {
  if (!value) return null;
  return dayjs(value, format).toDate();
};

export const convertStrToFormat = (
  value: string,
  format: string = 'YYYY/MM/DD',
): any => {
  if (!value) return '';
  return dayjs(value.toString()).format(format) ?? '';
};

export const calculateAge = (value: string, current: string): any => {
  if (!value) return '';
  const birthDate = convertStrToFormat(value);
  const currentDate = convertStrToFormat(current);
  const birthDateObj = dayjs(birthDate);
  return dayjs(currentDate).diff(birthDateObj, 'year') ?? '';
};

export const calculateDays = (jd: Record<string, any>) => {
  if (!jd) return '';
  let sum = 0;
  for (let i = 1; i <= 31; i++) {
    const element = jd[`calculation_date_${i}`];
    sum += element;
  }

  return sum;
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export enum DATE_FORMAT {
  YYYYMMDD_HHMMSS = 'YYYY/MM/DD HH:mm:ss',
  YYYYMM = 'YYYY/MM',
}

export const strToPercent = (value: string) => {
  if (!value) return null;
  const convert = value.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
  return Number(convert.replace('割', '0'));
};

export const getPropertiesEntity = (entity: ClassConstructor<unknown>) => {
  return Object.keys(
    getConnection().getRepository(entity).metadata.propertiesMap,
  );
};

export const generateNum = (mi_id: number, f_id: number, index: number) => {
  return mi_id
    .toString()
    ?.padStart(10, '0')
    .concat(
      f_id
        .toString()
        .padStart(10, '0')
        .concat(index.toString().padStart(10, '0')),
    );
};

export const handleMappingRowByEntity = (
  entity: ClassConstructor<unknown>,
  rows: string[],
  ignore: string[],
) => {
  if (!rows) {
    return [];
  }
  const properties = getPropertiesEntity(entity).filter(
    (key) => ![...ignore, 'created_date', 'update_date', 'id'].includes(key),
  );
  const dataToSave: Record<string, any>[] = [];
  for (const row of rows) {
    const tranformed = {};
    for (let i = 0; i < properties.length; i++) {
      const key = properties[i];
      tranformed[key] = row[i] || null;
    }
    dataToSave.push(tranformed);
  }

  return dataToSave;
};

function getG(g: string): number {
  switch (g) {
    case '1':
      return 1867;
    case '2':
      return 1911;
    case '3':
      return 1925;
    case '4':
      return 1988;
    case '5':
      return 2018;
  }
  return 0;
}

export const gyymmToDate = (value: string) => {
  if (!value) return null;
  const gYear = getG(value.charAt(0));
  const year = parseInt(value.charAt(1) + value.charAt(2));
  const newDate = `${year + gYear}/${value.charAt(3)}${value.charAt(4)}`;
  return strToDate(newDate, DATE_FORMAT.YYYYMM);
};

export const dateToNumberFormat = (
  value: Date,
  formatDefault: string = 'YYYYMM',
) => {
  if (!value) return null;
  const valueStr = dayjs(value).format(formatDefault);
  return parseInt(valueStr);
};

export const dateToStr = (value: Date, formatDefault: string = 'YYYYMMDD') => {
  if (!value) return null;
  return dayjs(value).format(formatDefault);
};

export const getFirstDayInMonth = (month: number, year: number) => {
  return dayjs()
    .month(month - 1)
    .year(year)
    .startOf('month')
    .toDate();
};

export const getLastDayInMonth = (month: number, year: number) => {
  return dayjs()
    .month(month - 1)
    .year(year)
    .endOf('month')
    .toDate();
};

export const toDate = (date: Date, hhmmss: number) => {
  let hhmmssStr = hhmmss + '';
  while (hhmmssStr.length < 6) {
    hhmmssStr = '0'.concat(hhmmssStr);
  }
  const ss = Number(hhmmssStr.charAt(4) + hhmmssStr.charAt(5));
  const mm = Number(hhmmssStr.charAt(2) + hhmmssStr.charAt(3));
  const hh = Number(hhmmssStr.charAt(0) + hhmmssStr.charAt(1));
  return dayjs(date).hour(hh).minute(mm).second(ss).toDate();
};

export const MAP_COLOR = new Map([
  [1, '#EA8EAA'],
  [2, '#C6AE4A'],
  [3, '#48C1A5'],
  [4, '#6BBAD8'],
  [5, '#9993DE'],
]);
