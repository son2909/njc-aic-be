import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError } from '../../filter/api.error';
import { EntityManager, getManager } from 'typeorm';
import { AccountRepository } from '../accounts/accounts.repository';
import { AccountService } from '../accounts/accounts.service';
import { AuthCognitoNewService } from '../auth-cognito/auth-cognito-new.service';
import { AuthenticateRequestDto } from '../auth-cognito/dto';
import { GroupLink } from '../group-link/group-link.entity';
import { GroupLinkRepository } from '../group-link/group-link.repository';
import { GroupLinkService } from '../group-link/group-link.service';
import { AccountInfo } from './../../common/account-info';
import {
  AddMemberToGroupDto,
  GroupCreationDto,
  RenameGroupDto,
} from './dto/group-management.request.dto';
import { In } from 'typeorm';
import { GroupManagement } from './group-management.entity';
import { GroupManagementRepository } from './group-management.repository';
import { BaseService } from '../../utils/base.service';

@Injectable()
export class GroupManagementService extends BaseService<GroupManagement> {
  constructor(
    @InjectRepository(GroupManagement)
    public repository: GroupManagementRepository,
    private groupLinkService: GroupLinkService,
    private accountService: AccountService,
    private authCognitoService: AuthCognitoNewService,
  ) {
    super(repository);
  }

  /**
   * get list group
   */
  async getListGroups(authUser: AccountInfo) {
    const groups = await this.repository.find({
      where: {
        account_id: authUser.account_id,
      },
      order: {
        group_name: 'ASC',
      },
    });

    const groupLinks = await this.groupLinkService.getInfoAccountByGroupIds(
      groups.map((e) => e.group_id),
    );

    return groups.map((group) => ({
      ...group,
      members: groupLinks.get(group.group_id) || [],
    }));
  }

  async getListGroupsByUser(authUser: AccountInfo) {
    const groupLinks: any = await this.groupLinkService.getListGroupsByUser(
      authUser.account_id,
    );
    const arrGroupId = groupLinks.map((g) => g.group_id);
    const lstGroup = await this.repository.find({
      where: {
        group_id: In(arrGroupId),
      },
      order: {
        group_name: 'ASC',
      },
    });

    return lstGroup;
  }

  /**
   * create group
   * @param authUser
   * @param groupPayload
   */
  async createGroup(authUser: AccountInfo, groupPayload: GroupCreationDto) {
    let response: any = {};
    await getManager().transaction(async (tx: EntityManager) => {
      const newGroup = await tx
        .getCustomRepository(GroupManagementRepository)
        .insert({
          ...groupPayload,
          account_id: authUser.account_id,
          created_date: new Date(),
          update_date: new Date(),
        });

      response = newGroup.raw;

      //add group link
      const groupLink = tx.create(GroupLink, {
        account_id: authUser?.account_id,
        group_id: newGroup.raw.insertId,
        created_date: new Date(),
        update_date: new Date(),
      });
      await tx.getCustomRepository(GroupLinkRepository).save(groupLink);

      await tx.getCustomRepository(AccountRepository).update(
        {
          account_id: authUser.account_id,
        },
        { group_id: newGroup.raw.insertId },
      );
    });
    return response;
  }

  /**
   *
   * @param group_id
   * @param payload
   * @returns
   */
  async renameGroup(group_id: number, payload: RenameGroupDto) {
    const group = await this.repository.findOne({ group_id });

    if (!group) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Group not found');
    }

    group.group_name = payload.group_name;

    return this.repository.save(group);
  }

  /**
   * add member to group
   * @param payload
   */
  async addMemberToGroup(payload: AddMemberToGroupDto) {
    const [group, account] = await Promise.all([
      this.repository.findOne({
        group_id: payload.group_id,
      }),
      this.accountService.getByAccountId(payload.account_id),
    ]);

    if (!group || !account) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Group or Account not found in database',
      );
    }

    return this.groupLinkService.createGroupLink(payload);
  }

  /**
   * delete group by groupID
   * @param group_id
   */
  async deleteGroupByGroupId(group_id: number, authUser: AccountInfo) {
    await getManager().transaction(async (tx: EntityManager) => {
      const groupManagement = tx.getCustomRepository(GroupManagementRepository);
      const groupLink = tx.getCustomRepository(GroupLinkRepository);

      await groupManagement.delete(group_id);
      const groupLinks = await groupLink.find({
        where: {
          group_id,
        },
      });

      await tx.getCustomRepository(GroupLinkRepository).remove(groupLinks);

      if (group_id === authUser.group_id) {
        await tx
          .getCustomRepository(AccountRepository)
          .update({ account_id: authUser.account_id }, { group_id: null });
      }
    });
  }

  async showUnitPriceByPassword(payload: AuthenticateRequestDto) {
    return this.authCognitoService.verifyPasswordCognito(payload);
  }

  async getGroupsExclude(account_id: number) {
    return this.repository.getGroupsExclude(account_id);
  }
}
