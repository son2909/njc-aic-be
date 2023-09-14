import { Sheet2JSONOpts, read, utils } from 'xlsx';
import { getMyPropertyDecorators } from './excel-column.decorator';
import { ExcelEntity } from './excel-entity.base';

interface HeaderOptions extends Sheet2JSONOpts {
  ignoreHeader?: number;
}

export class ExcelUtil {
  public static builder(
    fileStream: NodeJS.ReadableStream,
    type?: { prototype: any },
  ) {
    return new ExcelUtil.ExcelBuilder(fileStream, type);
  }

  static ExcelBuilder = class<T extends ExcelEntity> {
    _fileStream: NodeJS.ReadableStream;

    _sheetIdx: number = 0;

    _headerOptions: HeaderOptions = {
      blankrows: false,
      raw: true,
      rawNumbers: true,
      ignoreHeader: 1,
      defval: null,
    };

    _data: T[];

    _type_T: any;

    constructor(fileStream: NodeJS.ReadableStream, type?: { prototype: any }) {
      this._fileStream = fileStream;
      this._type_T = type;
    }

    headerOptions(headerOptions: HeaderOptions) {
      this._headerOptions = { ...this._headerOptions, ...headerOptions };
      return this;
    }

    sheetIdx(sheetIdx: number) {
      this._sheetIdx = sheetIdx;
      return this;
    }

    data() {
      // file to data
      const workbook = read(this._fileStream, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[this._sheetIdx]];
      this._data = utils.sheet_to_json(sheet, this._headerOptions || {});
      // remove data header
      while (this._headerOptions.ignoreHeader--) this._data.shift();
      const metadata = getMyPropertyDecorators(this._type_T);
      return this._data.map((e) => {
        let element = Reflect.construct(this._type_T, []);
        Object.keys(metadata).forEach((key) => {
          element[key] = Object.values(e)[metadata[key]];
        });
        return element;
      });
    }
  };
}
