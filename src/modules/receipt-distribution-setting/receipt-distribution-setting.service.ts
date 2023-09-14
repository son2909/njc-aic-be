import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClassFromExist, plainToClass } from 'class-transformer';
import { ApiError } from '../../filter/api.error';
import { BaseService } from '../../utils/base.service';
import { CreateReceiptDistributionSettingDto } from './dto/create-receipt-distribution-setting.dto';
import { ReceiptDistributionSettingDto } from './dto/receipt-distribution-setting.dto';
import { ReceiptDistributionSetting } from './entities/receipt-distribution-setting.entity';
import { ReceiptDistributionSettingRepository } from './receipt-distribution-setting.repository';

@Injectable()
export class ReceiptDistributionSettingService extends BaseService<ReceiptDistributionSetting> {
  constructor(
    @InjectRepository(ReceiptDistributionSetting)
    private rdSettingRepository: ReceiptDistributionSettingRepository,
  ) {
    super(rdSettingRepository);
  }

  async findAllCustom() {
    const entities = await this.rdSettingRepository.findAllCustom();
    return entities.map((entity) => {
      const result = plainToClass(ReceiptDistributionSettingDto, entity, {
        excludeExtraneousValues: true,
      });
      if (!result.flag_below_the_score) {
        result.flag_below_the_score = 0;
      }
      if (!result.more_than_the_corresponding_score_flag) {
        result.more_than_the_corresponding_score_flag = 0;
      }
      result.score = `${result.flag_below_the_score} - ${result.more_than_the_corresponding_score_flag}`;
      return result;
    });
  }

  async getById(setting_id: number) {
    let entity = await this.findById(setting_id);
    if (!entity)
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Receipt distribution setting not exist',
      );
    const result = plainToClass(ReceiptDistributionSettingDto, entity, {
      excludeExtraneousValues: true,
    });
    if (!result.flag_below_the_score) {
      result.flag_below_the_score = 0;
    }
    if (!result.more_than_the_corresponding_score_flag) {
      result.more_than_the_corresponding_score_flag = 0;
    }
    result.score = `${result.flag_below_the_score} - ${result.more_than_the_corresponding_score_flag}`;
    return result;
  }

  async create(createReq: CreateReceiptDistributionSettingDto) {
    const entity = plainToClass(ReceiptDistributionSetting, createReq, {
      excludeExtraneousValues: true,
    });
    entity.created_date = new Date();
    entity.update_date = new Date();
    await this.rdSettingRepository.save(entity);
    return plainToClass(ReceiptDistributionSettingDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  async updateRd(
    setting_id: number,
    createReq: CreateReceiptDistributionSettingDto,
  ) {
    let entity = await this.findById(setting_id);
    if (!entity)
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Receipt distribution setting not exist',
      );
    entity = classToClassFromExist(
      plainToClass(ReceiptDistributionSetting, createReq),
      entity,
    );
    entity.update_date = new Date();
    await this.rdSettingRepository.save(entity);
    return plainToClass(ReceiptDistributionSettingDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
