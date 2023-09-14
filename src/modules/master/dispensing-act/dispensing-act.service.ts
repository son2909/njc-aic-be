import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { DispensingActRepository } from './dispensing-act.repository';
import { DispensingAct } from './entities/dispensing-act.entity';

@Injectable()
export class DispensingActService extends BaseService<DispensingAct> {
  constructor(
    @InjectRepository(DispensingAct)
    private readonly dispensingActRepo: DispensingActRepository,
  ) {
    super(dispensingActRepo);
  }
}
