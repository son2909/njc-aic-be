import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../../utils/base.service';
import { DpcError } from './dpc-error.enitty';
import { DpcErrorRepository } from './dpc-error.repository';

@Injectable()
export class DpcErrorService extends BaseService<DpcError> {
  constructor(
    @InjectRepository(DpcError)
    private readonly dpcErrorRepository: DpcErrorRepository,
  ) {
    super(dpcErrorRepository);
  }
}
