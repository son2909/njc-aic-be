import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClassFromExist, plainToClass } from 'class-transformer';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dto';
import { ApiError } from 'src/filter/api.error';
import { BaseService } from 'src/utils/base.service';
import { dateToNumberFormat } from 'src/utils/helper';
import { AppraisalConditionSettingRepository } from './appraisal-condition-setting.repository';
import { AppraisalConditionSettingDto } from './dto/appraisal-condition-setting.dto';
import { CreateAppraisalConditionSettingDto } from './dto/create-appraisal-condition-setting.dto';
import { AppraisalConditionSetting } from './entities/appraisal-condition-setting.entity';
import { IdentificationInfoEnum } from './enum/identification-info.enum';

@Injectable()
export class AppraisalConditionSettingService extends BaseService<AppraisalConditionSetting> {
  constructor(
    @InjectRepository(AppraisalConditionSetting)
    private appraisalConditionSettingRepository: AppraisalConditionSettingRepository,
  ) {
    super(appraisalConditionSettingRepository);
  }

  async search(pageOptionsDto: PageOptionsDto) {
    const itemCount = await this.appraisalConditionSettingRepository.count();
    const data = await this.appraisalConditionSettingRepository.search(
      pageOptionsDto,
    );
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async create(request: CreateAppraisalConditionSettingDto) {
    const entity = plainToClass(AppraisalConditionSetting, request, {
      excludeExtraneousValues: true,
    });
    entity.start_month = dateToNumberFormat(request.start_month, 'YYYYMMDD');
    entity.end_month = dateToNumberFormat(request.end_month, 'YYYYMMDD');
    entity.created_date = new Date();
    entity.update_date = new Date();
    await this.appraisalConditionSettingRepository.save(entity);
    return plainToClass(AppraisalConditionSettingDto, entity);
  }

  async updateById(id: number, request: CreateAppraisalConditionSettingDto) {
    let entity = await this.findById(id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Setting is not exist');
    }
    entity = classToClassFromExist(
      plainToClass(AppraisalConditionSetting, request),
      entity,
    );
    entity.start_month = dateToNumberFormat(request.start_month, 'YYYYMMDD');
    entity.end_month = dateToNumberFormat(request.end_month, 'YYYYMMDD');
    entity.update_date = new Date();
    await this.appraisalConditionSettingRepository.save(entity);
    return plainToClass(AppraisalConditionSettingDto, entity);
  }

  async getById(id: number) {
    const result = await this.appraisalConditionSettingRepository.getById(id);
    if (!result) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Setting is not exist');
    }
    return result;
  }

  async getClinicalIdentification(identification: string) {
    const tbl_iden = IdentificationInfoEnum[identification];
    if (!tbl_iden) return [];
    return this.appraisalConditionSettingRepository.getClinicalIdentification(
      tbl_iden,
    );
  }

  async getComputer(identification: string) {
    const tbl_iden = IdentificationInfoEnum[identification];
    if (!tbl_iden) return [];
    return this.appraisalConditionSettingRepository.getComputer(tbl_iden);
  }
}
