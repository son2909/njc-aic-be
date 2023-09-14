import { MedicalPractice } from '../../../modules/master/medical-practice/entities/medical-practice.entity';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { SI } from './SI.entity';

@EntityRepository(SI)
export class SIRepository extends Repository<SI> {
  async findByJoinMedicalPractice(kanji_name: string, mi_id: number) {
    const qb = getManager()
      .createQueryBuilder(SI, 'si')
      .select('si.id', 'id')
      .addSelect('si.clinical_identification', 'clinical_identification')
      .addSelect('si.medical_practice_code', 'medical_practice_code')
      .innerJoin(
        MedicalPractice,
        'med',
        'med.medical_practice_code = si.medical_practice_code',
      )
      .where(
        `si.mi_id = :mi_id 
            AND 
                (med.abbreviated_kanji = :kanji_name 
                    OR med.abbreviated_kana = :kanji_name)`,
        { mi_id, kanji_name },
      );
    return qb.getRawOne();
  }
}
