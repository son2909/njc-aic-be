import { EntityRepository, Repository } from 'typeorm';
import { SpecificEquipmentM } from './specific-equipment.entity';

@EntityRepository(SpecificEquipmentM)
export class SpecificEquipmentMRepository extends Repository<SpecificEquipmentM> {}
