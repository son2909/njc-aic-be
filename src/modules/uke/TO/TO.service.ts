import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { TO } from './TO.entity';
import { TORepository } from './TO.repository';

@Injectable()
export class TOService extends BaseService<TO> {
  constructor(
    @InjectRepository(TO)
    private readonly tORepository: TORepository,
  ) {
    super(tORepository);
  }

  async findByJoinSpecificEquipment(kanji_name: string, mi_id: number) {
    return this.tORepository.findByJoinSpecificEquipment(kanji_name, mi_id);
  }
}
