import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSessionService } from './chat-session.service';
import { ChatSessionRepository } from './chat-session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatSessionRepository])],
  providers: [ChatSessionService],
  controllers: [],
})
export class ChatSessionModule {}
