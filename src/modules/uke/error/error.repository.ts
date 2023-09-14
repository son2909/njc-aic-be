import { EntityRepository, Repository } from 'typeorm';
import { ErrorT } from './error.entity';

@EntityRepository(ErrorT)
export class ErrorTRepository extends Repository<ErrorT> {}
