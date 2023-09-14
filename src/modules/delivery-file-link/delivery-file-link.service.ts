import { Injectable } from '@nestjs/common';
import { DeliveryFileLink } from './delivery-file-link.entity';
import { BaseService } from 'src/utils/base.service';
import { DeliveryFileLinkRepository } from './delivery-file-link.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeliveryFileLinkService extends BaseService<DeliveryFileLink> {
  constructor(
    @InjectRepository(DeliveryFileLink)
    private deliveryFileLinkRepository: DeliveryFileLinkRepository,
  ) {
    super(deliveryFileLinkRepository);
  }
}
