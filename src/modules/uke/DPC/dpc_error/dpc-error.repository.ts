import { EntityRepository, Repository } from 'typeorm';
import { DpcError } from './dpc-error.enitty';

@EntityRepository(DpcError)
export class DpcErrorRepository extends Repository<DpcError> {}
