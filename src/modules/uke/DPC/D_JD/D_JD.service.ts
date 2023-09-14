import { D_JD } from './D_JD.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { D_JDRepository } from './D_JD.repository';
import { BaseService } from '../../../../utils/base.service';

@Injectable()
export class D_JDService extends BaseService<D_JD> {
  constructor(
    @InjectRepository(D_JD)
    private readonly D_JDRepository: D_JDRepository,
  ) {
    super(D_JDRepository);
  }
}
