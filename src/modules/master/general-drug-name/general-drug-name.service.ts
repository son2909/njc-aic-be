import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { GeneralDrugName } from './entities/general-drug-name.entity';
import { GeneralDrugNameRepository } from './general-drug-name.repository';

@Injectable()
export class GeneralDrugNameService extends BaseService<GeneralDrugName> {
  constructor(
    @InjectRepository(GeneralDrugName)
    private readonly generalDrugNameRepo: GeneralDrugNameRepository,
  ) {
    super(generalDrugNameRepo);
  }

  async save(entities: GeneralDrugName[]) {
    return this.generalDrugNameRepo.save(entities);
  }
}
