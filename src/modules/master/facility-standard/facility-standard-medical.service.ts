import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityStandardMedical } from './entities/facility-standard-medical.entity';
import { FacilityStandardMedicalRepository } from './repository/facility-standard-medical.repository';
import { BaseService } from '../../../utils/base.service';

@Injectable()
export class FacilityStandardMedicalService extends BaseService<FacilityStandardMedical> {
  constructor(
    @InjectRepository(FacilityStandardMedical)
    private readonly fsMedicalRepository: FacilityStandardMedicalRepository,
  ) {
    super(fsMedicalRepository);
  }

  async bulkInsertMedical(
    entities: FacilityStandardMedical[],
    colPrimaryKey: string = 'id',
    colOverride: Array<string> = [],
    batchSize: number = 500,
  ) {
    const qb = this.fsMedicalRepository.createQueryBuilder();
    while (entities.length) {
      const chunk = entities.splice(0, batchSize);
      await qb
        .insert()
        .values(chunk)
        .orUpdate({
          conflict_target: colPrimaryKey,
          overwrite: colOverride,
        })
        .execute();
    }
  }
}
