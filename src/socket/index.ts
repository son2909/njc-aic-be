import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import { ApiError } from 'src/filter/api.error';
import { deserialize } from 'class-transformer';
import { HttpStatus, INestApplicationContext, Logger } from '@nestjs/common';
import { MessageActionEnum } from '../enum/message-action.enum';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChatGroupService } from 'src/modules/chat-group/chat-group.service';
import {
  MessageActionDto,
  PayloadBroadcastDto,
  PayloadFriendDto,
  PayloadGroupDto,
} from 'src/modules/chat-group/dto';
let app: INestApplicationContext;
export const handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  app =
    app ??
    (await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    }));
  const socketService = app.get(ChatGroupService);

  const {
    body,
    requestContext: { connectionId, routeKey },
    queryStringParameters,
  } = event;

  Logger.debug({ routeKey, connectionId, body });

  switch (routeKey) {
    case MessageActionEnum.CONNECT: {
      try {
        const currentUser = await socketService.verifyTokenCognito(
          queryStringParameters?.token,
        );
        await socketService.openConnect(connectionId, currentUser);
      } catch (error) {
        console.log('connect socket error.');
      }
      break;
    }

    case MessageActionEnum.DISCONNECT:
      try {
        await socketService.disconnect(connectionId);
      } catch (error) {
        console.log('connect socket error.');
      }
      break;

    case MessageActionEnum.GROUP: {
      try {
        const payload: MessageActionDto<PayloadGroupDto> = deserialize(
          MessageActionDto<PayloadGroupDto>,
          body,
        );
        await socketService.sendGroup(connectionId, payload.data);
      } catch (error) {
        console.log('send message to group error.');
      }

      break;
    }

    case MessageActionEnum.FRIEND: {
      const payload = deserialize(
        MessageActionDto<PayloadFriendDto>,
        body,
      ).data;
      await socketService.sendFriend(connectionId, payload);
      break;
    }

    case MessageActionEnum.PING: {
      await socketService.ping(connectionId);
      break;
    }

    case MessageActionEnum.BROADCAST: {
      const payload = deserialize(
        MessageActionDto<PayloadBroadcastDto>,
        body,
      ).data;
      await socketService.broadcast(payload);
      break;
    }

    case MessageActionEnum.DEFAULT:
      await socketService.ping(connectionId);
      break;
    default:
      throw new ApiError(HttpStatus.BAD_REQUEST, 'RouteKey not support');
  }
  return {
    statusCode: 200,
    body: JSON.stringify('Success'),
  };
};
