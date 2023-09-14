import { MessageActionEnum } from '../../../enum/message-action.enum';
import { Expose } from 'class-transformer';

export class MessageActionDto<T> {
  @Expose()
  action: MessageActionEnum;

  @Expose()
  data: T;

  constructor(partial: Partial<MessageActionDto<T>>) {
    Object.assign(this, partial);
  }
}
