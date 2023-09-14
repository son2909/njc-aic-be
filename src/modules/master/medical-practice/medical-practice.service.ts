import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { In } from 'typeorm';
import { MedicalPractice } from './entities/medical-practice.entity';
import { MedicalPracticeRepository } from './medical-practice.repository';

@Injectable()
export class MedicalPracticeService extends BaseService<MedicalPractice> {
  constructor(
    @InjectRepository(MedicalPractice)
    private medicalPracticeRepository: MedicalPracticeRepository,
  ) {
    super(medicalPracticeRepository);
  }

  async findByKanjiName(kanji_name: string) {
    return this.medicalPracticeRepository.find({
      where: [
        {
          abbreviated_kanji: kanji_name,
        },
        {
          abbreviated_kana: kanji_name,
        },
      ],
    });
  }

  async findByKanjiNameIn(kanji_names: string[]) {
    return this.medicalPracticeRepository.find({
      where: [
        {
          abbreviated_kanji: In(kanji_names),
        },
        {
          abbreviated_kana: In(kanji_names),
        },
      ],
    });
  }
}
