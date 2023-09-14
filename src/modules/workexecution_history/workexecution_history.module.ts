import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../accounts/accounts.module';
import { WorkexecutionHistoryController } from './workexecution_history.controller';
import { WorkexecutionHistoryRepository } from './workexecution_history.repository';
import { WorkexecutionHistoryService } from './workexecution_history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkexecutionHistoryRepository]),
    AccountModule,
  ],
  controllers: [WorkexecutionHistoryController],
  providers: [WorkexecutionHistoryService],
  exports: [WorkexecutionHistoryService],
})
export class WorkexecutionHistoryModule {}
