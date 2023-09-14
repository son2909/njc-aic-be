import { HttpStatus } from '@nestjs/common';
import { ApiError } from '../filter/api.error';
import {
  BaseEntity,
  DeleteResult,
  FindManyOptions,
  In,
  Repository,
} from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from './i.base.service';
import { PageOptionsDto } from '../common/dto/pagination-options.dto';
import { Order } from '../enum';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(public repository: Repository<T>) {}

  findAll(options?: FindManyOptions<any>): Promise<T[]> {
    return this.repository.find(options);
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id);
  }

  findByIds(ids: EntityId[]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async deleteMany(key: string, values: string[] | number[]): Promise<void> {
    if (values.length) {
      await this.repository
        .createQueryBuilder()
        .delete()
        .where(`${key} IN (:...values)`, {
          key,
          values,
        })
        .execute();
    }
  }

  async deleteThrow(id: EntityId, message: string): Promise<DeleteResult> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, message);
    }
    return this.repository.delete(id);
  }

  async partialUpdateMany(data: any[]): Promise<any[]> {
    return this.repository.save(data);
  }

  async bulkInsert(
    entities: any,
    colPrimaryKey: string | string[] = 'id',
    colOverride: Array<string> = [],
    batchSize: number = 500,
  ) {
    const cloneEntities = [...entities];
    const qb = this.repository.createQueryBuilder();
    while (cloneEntities.length) {
      const chunk = cloneEntities.splice(0, batchSize);
      await qb
        .insert()
        .values(chunk)
        .orUpdate(colOverride, colPrimaryKey, {
          skipUpdateIfNoValuesChanged: true,
        })
        .execute();
    }
  }

  async insertMany(entities: any, batchSize: number = 500) {
    const cloneEntities = [...entities];
    const qb = this.repository.createQueryBuilder();
    while (cloneEntities.length) {
      const chunk = cloneEntities.splice(0, batchSize);
      await qb.insert().values(chunk).execute();
    }
  }

  async searchMaster(
    pageOptionsDto: PageOptionsDto,
    tableName: string,
    keyword: string,
    code: string,
    name: string,
    searchOtherColumn: string[],
    idColumn: string = 'id',
    created_date = 'created_date',
  ) {
    const query = this.repository
      .createQueryBuilder()
      .select(idColumn, 'id')
      .addSelect(code, 'master_code')
      .addSelect(name, 'master_name')
      .addSelect(created_date, 'created_date')
      .addSelect(`'${tableName}'`, 'table_name');
    keyword &&
      query
        .where(`${code} like :code`, {
          code: `%${keyword.trim()}%`,
        })
        .orWhere(`${name} like :name`, {
          name: `%${keyword.trim()}%`,
        });
    keyword &&
      searchOtherColumn.length &&
      searchOtherColumn.map((e) =>
        query.orWhere(`${e} like :name`, {
          e: `%${keyword.trim()}%`,
        }),
      );
    query.orderBy(created_date, Order.DESC).orderBy(idColumn, Order.DESC);
    return Promise.all([
      query.limit(pageOptionsDto.limit).offset(pageOptionsDto.skip).execute(),
      query.getCount(),
    ]);
  }

  async searchExportMaster(
    tableName: string,
    keyword: string,
    code: string,
    name: string,
    searchOtherColumn: string[],
    idColumn: string = 'id',
    created_date = 'created_date',
  ) {
    const query = this.repository
      .createQueryBuilder()
      .select(idColumn, 'id')
      .addSelect(code, 'master_code')
      .addSelect(name, 'master_name')
      .addSelect(created_date, 'created_date')
      .addSelect(`'${tableName}'`, 'table_name');
    keyword &&
      query
        .where(`${code} like :code`, {
          code: `%${keyword.trim()}%`,
        })
        .orWhere(`${name} like :name`, {
          name: `%${keyword.trim()}%`,
        });
    keyword &&
      searchOtherColumn.length &&
      searchOtherColumn.map((e) =>
        query.orWhere(`${e} like :name`, {
          e: `%${keyword.trim()}%`,
        }),
      );
    query.orderBy(created_date, Order.DESC).orderBy(idColumn, Order.DESC);
    return query.execute();
  }

  findByIdMaster(id: any, primaryColumn: string = 'id'): Promise<any> {
    return this.repository
      .createQueryBuilder()
      .where(`${primaryColumn} = :id`, {
        id,
      })
      .getOne();
  }

  async updateMaster(
    id,
    data,
    key: string[],
    primaryColumn: string = 'id',
  ): Promise<T> {
    if (id != data[primaryColumn])
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Id invalid');
    const entiy = await this.findByIdMaster(id, primaryColumn);
    if (!entiy)
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Not found entity in database',
      );
    if (key.length > 0) {
      const queryGetDuplicate = this.repository
        .createQueryBuilder()
        .where('id != :id', { id });
      key.map((e) =>
        queryGetDuplicate.andWhere(`${e} = :value`, {
          value: data[e],
        }),
      );
      const dataDuplicate = await queryGetDuplicate.getOne();
      if (dataDuplicate)
        throw new ApiError(
          HttpStatus.BAD_REQUEST,
          'Duplicate unique column in database',
        );
    }
    await this.repository.save(data);
    return this.findByIdMaster(id);
  }
}
