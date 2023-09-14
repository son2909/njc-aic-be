import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGroupService } from './chat-group.service';
// import { MessageTemplateService } from './message-base.service';
import ApiGProvider from './components/aws-apigateway.component';
import { AccountRepository } from '../accounts/accounts.repository';
import { ChatSessionModule } from './chat-session/chat-session.module';
import { ChatSessionRepository } from './chat-session/chat-session.repository';
import { AccountService } from '../../modules/accounts/accounts.service';
import { AccountModule } from '../../modules/accounts/accounts.module';
import { GroupManagementModule } from '../../modules/group-management/group-management.module';
import { GroupManagementRepository } from '../../modules/group-management/group-management.repository';
import { GroupLinkModule } from '../../modules/group-link/group-link.module';
import { GroupLinkRepository } from '../../modules/group-link/group-link.repository';

import { ChatGroupController } from './chat-group.controller';
import { ChatGroupRepository } from './chat-group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
      ChatSessionRepository,
      ChatGroupRepository,
      GroupManagementRepository,
      GroupLinkRepository,
    ]),
    AccountModule,
    ChatSessionModule,
    GroupManagementModule,
    GroupLinkModule,
  ],
  providers: [ChatGroupService, AccountService, ApiGProvider],
  controllers: [ChatGroupController],
})
export class ChatGroupModule {}
