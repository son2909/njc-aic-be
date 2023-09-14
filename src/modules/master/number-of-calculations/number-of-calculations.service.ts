import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { NumberOfCalculationsT } from './number-of-calculations.entity';
import { NumberOfCalculationsTRepository } from './number-of-calculations.repository';

@Injectable()
export class NumberOfCalculationsTService extends BaseService<NumberOfCalculationsT> {
  constructor(
    @InjectRepository(NumberOfCalculationsT)
    private readonly numberOfCalculationsTRepository: NumberOfCalculationsTRepository,
  ) {
    super(numberOfCalculationsTRepository);
  }
}
