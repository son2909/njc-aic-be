import { EntityRepository, Repository } from 'typeorm';
import { RE } from './RE.entity';

@EntityRepository(RE)
export class RERepository extends Repository<RE> {
  async getAllPatient() {
    return this.createQueryBuilder('re').select('DISTINCT()');
  }
}
