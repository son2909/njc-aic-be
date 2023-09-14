import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { InjuryName } from './entities/injury-name.entity';
import { InjuryNameRepository } from './injury-name.repository';

@Injectable()
export class InjuryNameService extends BaseService<InjuryName> {
  constructor(
    @InjectRepository(InjuryName)
    private readonly injuryNameRepository: InjuryNameRepository,
  ) {
    super(injuryNameRepository);
  }
}
