import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../utils/base.service';
import { AlertRepository } from './alert.repository';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertService extends BaseService<Alert> {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepo: AlertRepository,
  ) {
    super(alertRepo);
  }

  getFirstByAccount(account_id: number) {
    return this.alertRepo.getFirstAlertAccount(account_id);
  }
}
