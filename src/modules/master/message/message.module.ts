import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
