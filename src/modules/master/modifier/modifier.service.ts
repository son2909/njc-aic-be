import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { Modifier } from './entities/modifier.entity';
import { ModifierRepository } from './modifier.repository';

@Injectable()
export class ModifierService extends BaseService<Modifier> {
  constructor(
    @InjectRepository(Modifier)
    private readonly modifierRepository: ModifierRepository,
  ) {
    super(modifierRepository);
  }
}
