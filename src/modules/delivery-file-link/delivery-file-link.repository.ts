import { EntityRepository, Repository } from 'typeorm';
import { DeliveryFileLink } from './delivery-file-link.entity';

@EntityRepository(DeliveryFileLink)
export class DeliveryFileLinkRepository extends Repository<DeliveryFileLink> {}
