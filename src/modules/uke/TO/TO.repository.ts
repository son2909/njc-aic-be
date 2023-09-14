import { SpecificEquipmentM } from '../../../modules/master/specific-equipment/specific-equipment.entity';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { TO } from './TO.entity';

@EntityRepository(TO)
export class TORepository extends Repository<TO> {
  async findByJoinSpecificEquipment(kanji_name: string, mi_id: number) {
    const qb = getManager()
      .createQueryBuilder(TO, 'to')
      .select('to.id', 'id')
      .addSelect('to.clinical_identification', 'clinical_identification')
      .addSelect('to.specified_equipment_code', 'specified_equipment_code')
      .innerJoin(
        SpecificEquipmentM,
        'se',
        'se.specified_equipment_code = to.specified_equipment_code',
      )
      .where(
        `to.mi_id = :mi_id 
                AND 
                    (se.kanji_name_1 = :kanji_name 
                        OR se.kanji_name_2 = :kanji_name)`,
        { mi_id, kanji_name },
      );
    return qb.getRawOne();
  }
}
