import { EntityRepository, Repository } from 'typeorm';
import { DispensingAct } from './entities/dispensing-act.entity';

@EntityRepository(DispensingAct)
export class DispensingActRepository extends Repository<DispensingAct> {}
