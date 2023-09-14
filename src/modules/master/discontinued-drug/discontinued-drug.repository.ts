import { EntityRepository, Repository } from 'typeorm';
import { DiscontinuedDrugM } from './discontinued-drug.entity';

@EntityRepository(DiscontinuedDrugM)
export class DiscontinuedDrugMRepository extends Repository<DiscontinuedDrugM> {}
