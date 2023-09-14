import { EntityRepository, Repository } from 'typeorm';
import { InjuryName } from './entities/injury-name.entity';

@EntityRepository(InjuryName)
export class InjuryNameRepository extends Repository<InjuryName> {}
