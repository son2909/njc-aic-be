import { EntityRepository, Repository } from 'typeorm';
import { GeneralDrugName } from './entities/general-drug-name.entity';

@EntityRepository(GeneralDrugName)
export class GeneralDrugNameRepository extends Repository<GeneralDrugName> {}
