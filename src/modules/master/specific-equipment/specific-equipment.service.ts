import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { BaseService } from '../../../utils/base.service';
import { SpecificEquipmentM } from './specific-equipment.entity';
import { SpecificEquipmentMRepository } from './specific-equipment.repository';

@Injectable()
export class SpecificEquipmentMService extends BaseService<SpecificEquipmentM> {
  constructor(
    @InjectRepository(SpecificEquipmentM)
    private readonly specificEquipmentMRepository: SpecificEquipmentMRepository,
  ) {
    super(specificEquipmentMRepository);
  }

  async findByKanjiName(kanji_name: string) {
    return this.specificEquipmentMRepository.find({
      where: [
        {
          kanji_name_1: kanji_name,
        },
        {
          kanji_name_2: kanji_name,
        },
      ],
    });
  }

  async findByKanjiNameIn(kanji_names: string[]) {
    return this.specificEquipmentMRepository.find({
      where: [
        {
          kanji_name_1: In(kanji_names),
        },
        {
          kanji_name_2: In(kanji_names),
        },
      ],
    });
  }
}
