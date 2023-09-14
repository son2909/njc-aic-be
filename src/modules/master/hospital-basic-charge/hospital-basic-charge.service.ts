import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { HospitalBasicChargeT } from './hospital-basic-charge.entity';
import { HospitalBasicChargeTRepository } from './hospital-basic-charge.repository';

@Injectable()
export class HospitalBasicChargeTService extends BaseService<HospitalBasicChargeT> {
  constructor(
    @InjectRepository(HospitalBasicChargeT)
    private readonly hospitalBasicChargeTRepository: HospitalBasicChargeTRepository,
  ) {
    super(hospitalBasicChargeTRepository);
  }
}
