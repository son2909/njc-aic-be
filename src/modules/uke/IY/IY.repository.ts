import { PharmaceuticalM } from '../../../modules/master/pharmaceutical/pharmaceutical.entity';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { IY } from './IY.entity';

@EntityRepository(IY)
export class IYRepository extends Repository<IY> {
  async findByJoinPharmaceutical(kanji_name: string, mi_id: number) {
    const qb = getManager()
      .createQueryBuilder(IY, 'iy')
      .select('iy.id', 'id')
      .addSelect('iy.clinical_identification', 'clinical_identification')
      .addSelect('iy.drug_code', 'drug_code')
      .innerJoin(PharmaceuticalM, 'pha', 'pha.drug_code = iy.drug_code')
      .where(
        `iy.mi_id = :mi_id 
            AND 
                (pha.kanji_name_1 = :kanji_name 
                    OR pha.kanji_name_2 = :kanji_name)`,
        { mi_id, kanji_name },
      );
    return qb.getRawOne();
  }
}
