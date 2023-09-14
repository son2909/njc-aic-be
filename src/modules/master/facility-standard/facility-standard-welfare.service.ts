import { InjectRepository } from '@nestjs/typeorm';
import { FacilityStandardWelfare } from './entities/facility-standard-welfare.entity';
import { FacilityStandardWelfareRepository } from './repository/facility-standard-welfare.repository';
import { BaseService } from '../../../utils/base.service';
export class FacilityStandardWelfareService extends BaseService<FacilityStandardWelfare> {
  constructor(
    @InjectRepository(FacilityStandardWelfare)
    private readonly fsWelfareRepository: FacilityStandardWelfareRepository,
  ) {
    super(fsWelfareRepository);
  }

  async bulkInsertWelfare(
    entities: FacilityStandardWelfare[],
    colPrimaryKey: string = 'id',
    colOverride: Array<string> = [],
    batchSize: number = 500,
  ) {
    const qb = this.fsWelfareRepository.createQueryBuilder();
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
