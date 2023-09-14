import { AccountInfo } from './../../common/account-info';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupLinkRepository } from './group-link.repository';
import { AddMemberToGroupDto } from '../group-management/dto/group-management.request.dto';
import { ApiError } from '../../filter/api.error';
import { GroupLink } from './group-link.entity';

@Injectable()
export class GroupLinkService {
  constructor(
    @InjectRepository(GroupLinkRepository)
    public repository: GroupLinkRepository,
  ) {}

  /**
   *
   * @param group_Ids
   * @returns
   */
  async getInfoAccountByGroupIds(group_Ids: number[]) {
    if (!group_Ids.length) return new Map<number, Record<string, any>[]>();
    const data = await this.repository.getInfoAccountByGroupIds(group_Ids);
    return new Map<number, Record<string, any>[]>(
      data.map((groupLink) => [groupLink.group_id, groupLink.members]),
    );
  }

  /**
   *
   * @param group_Ids
   * @returns
   */
  async getListGroupsByUser(account_id: number) {
    const data = await this.repository.find({
      where: {
        account_id: account_id,
      },
    });
    return data;
  }

  /**
   *
   * @param payload
   * @returns
   */
  async createGroupLink(payload: AddMemberToGroupDto) {
    const groupLink = await this.repository.findOne({
      account_id: payload.account_id,
      group_id: payload.group_id,
    });

    if (groupLink) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Member already exists');
    }

    return this.repository.save({
      account_id: payload.account_id,
      group_id: payload.group_id,
      created_date: new Date(),
      update_date: new Date(),
    });
  }

  /**
   *
   * @param group_id
   * @param account_id
   */
  deleteGroupLink = async (
    authUser: AccountInfo,
    group_id: number,
    account_id: number,
  ) => {
    if (authUser.account_id == account_id) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Can not delete admin');
    }

    const groupLink = await this.repository.findOne({ group_id, account_id });

    if (!groupLink) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Member and group not found');
    }

    return this.repository.delete({ group_id, account_id });
  };
}
