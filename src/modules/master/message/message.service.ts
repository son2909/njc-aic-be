import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MessageRepository,
  ) {
    super(messageRepository);
  }
}
