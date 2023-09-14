import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { EntityId } from 'typeorm/repository/EntityId';
import { BaseService } from '../../utils/base.service';
import { AccountService } from '../accounts/accounts.service';
import { SearchWorkHistoryRequestDto } from './dto/search-work-history-request.dto';
import { WorkexecutionHistory } from './entities/workexecution_history.entity';
import { SearchDateWorkHistory } from './enum/search-date-work-history.enum';
import { WorkexecutionHistoryRepository } from './workexecution_history.repository';

@Injectable()
export class WorkexecutionHistoryService extends BaseService<WorkexecutionHistory> {
  constructor(
    @InjectRepository(WorkexecutionHistory)
    public repository: WorkexecutionHistoryRepository,
    private readonly accountService: AccountService,
  ) {
    super(repository);
  }

  async searchWorkHistory(
    searchWorkHistoryRequestDto: SearchWorkHistoryRequestDto,
    accountId: EntityId,
  ): Promise<SearchWorkHistoryRequestDto[]> {
    switch (searchWorkHistoryRequestDto.type) {
      case SearchDateWorkHistory.ONE_MONTH: {
        const date = moment(new Date()).format('YYYY-MM');
        searchWorkHistoryRequestDto.fromDate = date;
        searchWorkHistoryRequestDto.toDate = date;
        break;
      }
      case SearchDateWorkHistory.SIX_MONTH: {
        const toDate = moment(new Date()).format('YYYY-MM');
        const fromDate = moment(new Date())
          .subtract(6, 'months')
          .format('YYYY-MM');
        searchWorkHistoryRequestDto.fromDate = fromDate;
        searchWorkHistoryRequestDto.toDate = toDate;
        break;
      }
      case SearchDateWorkHistory.ONE_YEAR: {
        const toDate = moment(new Date()).format('YYYY-MM');
        const fromDate = moment(new Date())
          .subtract(12, 'months')
          .format('YYYY-MM');
        searchWorkHistoryRequestDto.fromDate = fromDate;
        searchWorkHistoryRequestDto.toDate = toDate;
        break;
      }
      default:
        break;
    }
    return this.repository.searchWorkHistoryRequest(
      accountId,
      searchWorkHistoryRequestDto.fromDate,
      searchWorkHistoryRequestDto.toDate,
    );
  }

  async updateWork(accountId: EntityId): Promise<void> {
    const user = await this.accountService.findById(accountId);
    const [like_point, scheme, workDate, timeExcute] = await Promise.all([
      this.repository.getLikePoint(accountId),
      this.repository.getScheme(accountId),
      this.repository.getWorkDate(accountId),
      this.repository.getTimeExcute(accountId),
    ]);
    user.cumulative_like_points = like_point[0] ? like_point[0].like_point : 0;
    user.cumulative_number_of_proposals = scheme[0] ? scheme[0].scheme : 0;
    user.cumulative_cases = timeExcute[0] ? timeExcute[0].cumulative_cases : 0;
    user.processing_time = timeExcute[0] ? timeExcute[0].processing_time : 0;
    user.cumulative_number_processed = timeExcute[0]
      ? timeExcute[0].cumulative_number_processed
      : 0;
    await this.repository.save(user);
    await this.repository.save(workDate);
  }
}
