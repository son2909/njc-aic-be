import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ImportResultDto } from '../media-storage/dto/import-result.dto';

export class ImportBaseService {
  async isRowSuccess(
    clazz: ClassConstructor<unknown>,
    object: any,
    excludeExtraneousValues?: boolean,
  ): Promise<any> {
    const transformed = plainToClass(clazz, object, {
      excludeExtraneousValues: excludeExtraneousValues || false,
    });
    const errors = await validate(transformed);
    return errors.length === 0 ? transformed : null;
  }

  async getDataSuccess(
    data: any[],
    clazz: ClassConstructor<unknown>,
    excludeExtraneousValues?: boolean,
  ) {
    const result = await Promise.all(
      data.map((row) => this.isRowSuccess(clazz, row, excludeExtraneousValues)),
    );
    return result.filter((row) => row);
  }

  getResult(
    fileKey: string,
    total: number,
    totalSuccess: number,
  ): ImportResultDto {
    return {
      fileKey,
      total,
      totalSuccess,
      error: [],
    };
  }
}
