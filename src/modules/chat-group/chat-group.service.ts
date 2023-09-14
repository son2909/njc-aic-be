import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { MessageTemplateService } from './message-base.service';
import { PayloadBroadcastDto } from './dto/payload-broadcast.dto';
import { PayloadGroupDto } from './dto/payload-group.dto';
import { PayloadFriendDto } from './dto/payload-friend.dto';
import { Account } from '../accounts/accounts.entity';
import { AccountRepository } from '../accounts/accounts.repository';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AccountService } from '../../modules/accounts/accounts.service';
import { ChatSessionRepository } from './chat-session/chat-session.repository';
import { ChatSession } from './chat-session/chat_session.entity';
import { GroupManagement } from '../../modules/group-management/group-management.entity';
import { GroupManagementRepository } from '../../modules/group-management/group-management.repository';

import { ChatGroup } from './chat_group.entity';
import { ChatGroupRepository } from './chat-group.repository';

import { GroupLink } from '../../modules/group-link/group-link.entity';
import { GroupLinkRepository } from '../../modules/group-link/group-link.repository';
import { PageOptionsDto, PageDto, PageMetaDto } from '../../common/dto';
import { ChatManagementDto } from './dto';
import { Order } from '../../enum';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { MessageActionDto } from './dto/message-action.dto';
import { MessageActionEnum } from '../../enum/message-action.enum';
import { SaveOptions, RemoveOptions, In } from 'typeorm';
@Injectable()
export class ChatGroupService extends MessageTemplateService {
  @Inject()
  private readonly config: ConfigService;

  @Inject()
  private readonly accountService: AccountService;

  constructor(
    @InjectRepository(Account)
    private readonly userRepository: AccountRepository,
    @InjectRepository(ChatSession)
    private readonly chatSessionRepository: ChatSessionRepository,
    @InjectRepository(GroupManagement)
    private readonly groupManagementRepository: GroupManagementRepository,
    @InjectRepository(GroupLink)
    private readonly groupLinkRepository: GroupLinkRepository,

    @InjectRepository(ChatGroup)
    private readonly chatGroupRepository: ChatGroupRepository,

    @Inject('APIG-CLIENT')
    public readonly apiGetway: ApiGatewayManagementApi,
  ) {
    super(apiGetway);
  }

  /**
   *
   * @param connectionId
   */
  async ping(connectionId: string) {
    await this.send(connectionId, {
      action: MessageActionEnum.PING,
      data: {
        message: 'Pong',
      },
    });
  }

  /**
   *
   * @param token
   * @returns
   */
  async verifyTokenCognito(token: string) {
    try {
      const jwtTokenDecoded: any = verify(
        token,
        this.config.get('jwtSecretKey'),
      );
      const curentAccount = await this.accountService.findById(
        jwtTokenDecoded.payload.account_id,
      );

      return curentAccount;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   *
   * @param connectionId
   * @param userInfo
   * @returns
   */
  async openConnect(connectionId: string, userInfo: any) {
    var chatSession: ChatSession = new ChatSession({
      account_id: userInfo.account_id,
      connected_id: connectionId,
      connected_time: new Date(),
    });
    const chatSessionRes = await this.chatSessionRepository.save(chatSession);
    return chatSessionRes;
    // return this.dynamo.put(params).promise();
  }

  /**
   *
   * @param connectionId
   * @returns
   */
  async disconnect(connectionId: string) {
    const removeSession = await this.chatSessionRepository
      .createQueryBuilder()
      .where('connected_id = :connectedId', { connectedId: connectionId })
      .delete()
      .execute();
    return removeSession;
  }

  /**
   *
   * @param payload
   */
  async broadcast(payload: PayloadBroadcastDto) {
    //TODO: remove connectionId - user (offline)
    // const params = {
    //   TableName: this.dynamoTable,
    //   ProjectionExpression: 'connectionId',
    // };
    // const connectionIds = await this.dynamo.scan(params).promise();
    // await this.messageTemplateService.sendMany(
    //   connectionIds.Items.map((e) => e.connectionId),
    //   { action: MessageActionEnum.BROADCAST, data: payload },
    // );
  }

  /**
   *
   * @param connectId
   * @param group
   */
  async sendGroup(connectId: string, messageGroup: PayloadGroupDto) {
    let chatGroup: ChatGroup = new ChatGroup(messageGroup);
    chatGroup.created_date = new Date();
    const _chatGroup = await this.chatGroupRepository.save(chatGroup);
    const groupLinkList = await this.groupLinkRepository.find({
      where: {
        group_id: messageGroup.group_id,
      },
    });
    const account_IdArr = groupLinkList.map((groupLink) => {
      return groupLink.account_id;
    });
    const chatSessionLst = await this.chatSessionRepository.find({
      where: {
        account_id: In(account_IdArr),
      },
    });
    let messageActionDto: MessageActionDto<ChatGroup> = new MessageActionDto({
      data: _chatGroup,
      action: MessageActionEnum.GROUP,
    });
    chatSessionLst.length > 0 &&
      (await this.sendMany<ChatGroup>(
        chatSessionLst.map((e) => e.connected_id),
        messageActionDto,
      ));
  }

  /**
   *
   * @param connectId
   * @param friend
   */
  async sendFriend(connectId: string, friend: PayloadFriendDto) {
    //TODO: code
  }

  async getListMessageFromGroup(
    chatManagementDto: PageOptionsDto<ChatManagementDto>,
  ) {
    const [entities, itemCount] = await this.chatGroupRepository.findAndCount({
      where: {
        group_id: chatManagementDto.searchOption.group_id,
      },
      order: {
        created_date: Order.DESC,
      },
      skip: chatManagementDto.skip,
      take: chatManagementDto.limit,
    });
    var pageOptionsDto: PageOptionsDto = new PageOptionsDto();
    pageOptionsDto = Object.assign(pageOptionsDto, chatManagementDto);
    return new PageDto(
      entities,
      new PageMetaDto({ itemCount, pageOptionsDto }),
    );
  }
}
