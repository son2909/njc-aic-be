import { Inject, Injectable } from '@nestjs/common';
import { MessageActionDto } from './dto/message-action.dto';
import { serialize } from 'class-transformer';
import { ApiGatewayManagementApi } from 'aws-sdk';

@Injectable()
export class MessageTemplateService {
  constructor(public readonly apiGetway: ApiGatewayManagementApi) {}

  public async send<T>(receiverId: string, message: MessageActionDto<T>) {
    try {
      return this.apiGetway
        .postToConnection({
          ConnectionId: receiverId,
          Data: JSON.stringify(message),
        })
        .promise();
    } catch (e) {
      console.log('send message error: ', message);
    }
  }

  public async sendMany<T>(
    receiverIds: string[],
    message: MessageActionDto<T>,
  ) {
    return Promise.all(
      receiverIds.map((receiverId) => {
        console.log('sendMany message: ', message);
        return this.send(receiverId, message);
      }),
    );
  }
}
