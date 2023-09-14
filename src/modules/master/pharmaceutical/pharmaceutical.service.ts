import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { BaseService } from '../../../utils/base.service';
import { PharmaceuticalM } from './pharmaceutical.entity';
import { PharmaceuticalMRepository } from './pharmaceutical.repository';
@Injectable()
export class PharmaceuticalMService extends BaseService<PharmaceuticalM> {
  constructor(
    @InjectRepository(PharmaceuticalM)
    private readonly pharmaceuticalMRepository: PharmaceuticalMRepository,
  ) {
    super(pharmaceuticalMRepository);
  }

  async findByKanjiName(kanji_name: string) {
    return this.pharmaceuticalMRepository.find({
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
    return this.pharmaceuticalMRepository.find({
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
