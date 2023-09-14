import { Order } from '../../enum';
import { EntityRepository, Repository } from 'typeorm';
import { DisplayCodeOne } from '../announcement/dto/enum/announcement-display-1.enum';
import { Alert } from './entities/alert.entity';

@EntityRepository(Alert)
export class AlertRepository extends Repository<Alert> {
  getFirstAlertAccount(account_id: number) {
    const qb = this.createQueryBuilder('a')
      .select('a.alert_id', 'alert_id')
      .addSelect('a.title', 'title')
      .addSelect('a.content', 'content')
      .where(
        `(a.display_code_1 = :all
		    OR (a.display_code_1 IS NOT NULL
			    AND a.display_code_1 <> :all
			    AND a.display_code_2 = :account_id))
	      AND a.display_expiration_date >= CURRENT_DATE()`,
        { all: DisplayCodeOne.COMPANY, account_id },
      )
      .orderBy('a.created_date', Order.DESC);
    return qb.getRawOne();
  }
}
