import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { IssuingQueryManagement } from './issuing_query_management.entity';
import { IssuingQueryManagementRepository } from './issuing_query_management.repository';

@Injectable()
export class IssuingQueryManagementService extends BaseService<IssuingQueryManagement> {
  constructor(
    @InjectRepository(IssuingQueryManagement)
    private readonly issuingQueryManagementRepository: IssuingQueryManagementRepository,
  ) {
    super(issuingQueryManagementRepository);
  }
}
