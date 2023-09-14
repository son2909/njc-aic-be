import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { IY } from './IY.entity';
import { IYRepository } from './IY.repository';

@Injectable()
export class IYService extends BaseService<IY> {
  constructor(
    @InjectRepository(IY)
    private readonly iYRepository: IYRepository,
  ) {
    super(iYRepository);
  }

  async findByJoinPharmaceutical(kanji_name: string, mi_id: number) {
    return this.iYRepository.findByJoinPharmaceutical(kanji_name, mi_id);
  }
}
