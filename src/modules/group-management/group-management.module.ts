import { Module } from '@nestjs/common';
import { GroupManagementController } from './group-management.controller';
import { GroupManagementService } from './group-management.service';
import { GroupManagementRepository } from './group-management.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupLinkService } from '../group-link/group-link.service';
import { GroupLinkRepository } from '../group-link/group-link.repository';
import { AccountModule } from '../accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupManagementRepository, GroupLinkRepository]),
    AccountModule,
  ],
  controllers: [GroupManagementController],
  providers: [
    GroupManagementService,
    GroupManagementRepository,
    GroupLinkService,
  ],
  exports: [
    GroupManagementService,
    GroupManagementRepository,
    GroupLinkService,
  ],
})
export class GroupManagementModule {}
