import { EntityRepository, Repository } from 'typeorm';
import { NumberOfCalculationsT } from './number-of-calculations.entity';

@EntityRepository(NumberOfCalculationsT)
export class NumberOfCalculationsTRepository extends Repository<NumberOfCalculationsT> {}
