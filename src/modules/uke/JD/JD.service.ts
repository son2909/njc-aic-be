import { JD } from './JD.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { JDRepository } from './JD.repository';

@Injectable()
export class JDService extends BaseService<JD> {
  constructor(
    @InjectRepository(JD)
    private readonly jDRepository: JDRepository,
  ) {
    super(jDRepository);
  }
}
