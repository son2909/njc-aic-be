import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { SI } from './SI.entity';
import { SIRepository } from './SI.repository';

@Injectable()
export class SIService extends BaseService<SI> {
  constructor(
    @InjectRepository(SI)
    private readonly sIRepository: SIRepository,
  ) {
    super(sIRepository);
  }

  async findByJoinMedicalPractice(kanji_name: string, mi_id: number) {
    return this.sIRepository.findByJoinMedicalPractice(kanji_name, mi_id);
  }
}
