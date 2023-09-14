import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementModule } from '../announcement/announcement.module';
import { GroupManagementModule } from '../group-management/group-management.module';
import { ProposalController } from './proposal.controller';
import { ProposalRepository } from './proposal.repository';
import { ProposalService } from './proposal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalRepository]),
    AnnouncementModule,
    GroupManagementModule,
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
  exports: [ProposalService],
})
export class ProposalModule {}
