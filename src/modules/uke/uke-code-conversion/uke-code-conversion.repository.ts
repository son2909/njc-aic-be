import { EntityRepository, Repository } from 'typeorm';
import { UkeCodeConversion } from './uke-code-conversion.entity';

@EntityRepository(UkeCodeConversion)
export class UkeCodeConversionRepository extends Repository<UkeCodeConversion> {}
