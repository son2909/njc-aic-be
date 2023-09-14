import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { ErrorT } from './error.entity';
import { ErrorTRepository } from './error.repository';

@Injectable()
export class ErrorTService extends BaseService<ErrorT> {
  constructor(
    @InjectRepository(ErrorT)
    private readonly errorTRepository: ErrorTRepository,
  ) {
    super(errorTRepository);
  }
}
