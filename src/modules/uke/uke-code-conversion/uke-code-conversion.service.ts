import { UkeCodeConversion } from './uke-code-conversion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { UkeCodeConversionRepository } from './uke-code-conversion.repository';

@Injectable()
export class UkeCodeConversionService extends BaseService<UkeCodeConversion> {
  constructor(
    @InjectRepository(UkeCodeConversion)
    private readonly ukeCodeConversionRepository: UkeCodeConversionRepository,
  ) {
    super(ukeCodeConversionRepository);
  }
}
