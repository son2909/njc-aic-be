import { EntityRepository, Repository } from 'typeorm';
import { Calendar } from './entities/calendar.entity';

@EntityRepository(Calendar)
export class CalendarRepository extends Repository<Calendar> {}
