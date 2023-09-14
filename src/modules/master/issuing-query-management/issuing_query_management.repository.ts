import { EntityRepository, Repository } from 'typeorm';
import { IssuingQueryManagement } from './issuing_query_management.entity';

@EntityRepository(IssuingQueryManagement)
export class IssuingQueryManagementRepository extends Repository<IssuingQueryManagement> {}
