import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { SearchWorkHistoryRequestDto } from './dto/search-work-history-request.dto';
import { WorkexecutionHistoryService } from './workexecution_history.service';
@Controller('workexecution-history')
export class WorkexecutionHistoryController {
  constructor(
    private readonly workexecutionHistoryService: WorkexecutionHistoryService,
  ) {}

  @Post('/search')
  @ApiBody({
    type: SearchWorkHistoryRequestDto,
  })
  async searchWorkHistory(
    @Body() searchWorkHistoryRequestDto: SearchWorkHistoryRequestDto,
    @AuthUser() authUser: AccountInfo,
  ) {
    return this.workexecutionHistoryService.searchWorkHistory(
      searchWorkHistoryRequestDto,
      authUser.account_id,
    );
  }

  @Put('')
  async updateWork(@AuthUser() authUser: AccountInfo) {
    return this.workexecutionHistoryService.updateWork(authUser.account_id);
  }
}
