import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AccountInfo } from '../../common/account-info';
import { PageMetaDto } from '../../common/dto/pagination-meta.dto';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { PageDto } from '../../common/dto/pagination.dto';
import { ApiError } from '../../filter/api.error';
import { BaseService } from '../../utils/base.service';
import { EntityManager, getManager } from 'typeorm';
import { AnnouncementRepository } from '../announcement/announcement.repository';
import { AnnouncementService } from '../announcement/announcement.service';
import { DisplayCodeOne } from '../announcement/dto/enum/announcement-display-1.enum';
import { Announcement } from '../announcement/entities/announcement.entity';
import { GroupManagement } from '../group-management/group-management.entity';
import { GroupManagementService } from '../group-management/group-management.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ProposalPoint } from './dto/enum/proposal-point.enum';
import { ProposalDto } from './dto/response/proposal.dto';
import { SearchProposalResponse } from './dto/response/search-proposal.response';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Proposal } from './entities/proposal.entity';
import { ProposalRepository } from './proposal.repository';

@Injectable()
export class ProposalService extends BaseService<Proposal> {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepo: ProposalRepository,
    private readonly announcementService: AnnouncementService,
    private readonly groupService: GroupManagementService,
  ) {
    super(proposalRepo);
  }

  async findAllAndPaging(
    pageOptionsDto: PageOptionsDto,
    auth_user?: AccountInfo,
  ): Promise<PageDto<ProposalDto>> {
    const itemCount = await this.proposalRepo.countProposalInfo(
      auth_user.account_id,
    );
    const entities =
      itemCount > 0
        ? await this.proposalRepo.selectProposalInfo(
            pageOptionsDto,
            auth_user.account_id,
          )
        : [];
    const data = entities.map((entity) =>
      plainToClass(ProposalDto, entity, {
        excludeExtraneousValues: true,
      }),
    );
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async getById(proposal_id: number): Promise<ProposalDto> {
    const qb = this.proposalRepo
      .buildQueryProposalInfo()
      .where('proposal.proposal_id = :proposal_id', {
        proposal_id: proposal_id,
      });
    const entity: SearchProposalResponse = await qb.getRawOne();
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Proposal not exist');
    }
    return plainToClass(ProposalDto, entity);
  }

  async create(
    create_proposal_dto: CreateProposalDto,
    auth_user?: AccountInfo,
  ): Promise<ProposalDto> {
    let proposal_id = null;
    await getManager().transaction(async (em: EntityManager) => {
      // create proposal
      const proposal = {
        ...plainToClass(Proposal, create_proposal_dto),
        account_id: auth_user.account_id,
        group_id: auth_user.group_id,
        proposal_date: new Date(),
        created_date: new Date(),
        update_date: new Date(),
      } as Proposal;
      const resultInsert = await em
        .getCustomRepository(ProposalRepository)
        .insert(proposal);
      proposal_id = resultInsert.raw.insertId;
      proposal.proposal_id = proposal_id;

      // create announcement
      const allAnnouncement = await this.toAnnouncementAllGroup(
        proposal,
        auth_user,
      );
      await em
        .getCustomRepository(AnnouncementRepository)
        .insert(allAnnouncement);
    });
    return {
      ...plainToClass(ProposalDto, create_proposal_dto),
      proposal_id,
    };
  }

  async toAnnouncementAllGroup(proposal: Proposal, auth_user?: AccountInfo) {
    const groupList = await this.groupService.getGroupsExclude(
      auth_user.account_id,
    );
    return groupList.map((group: GroupManagement) => {
      const announcement = this.toAnnouncement(proposal, auth_user);
      announcement.display_code_3 = group.account_id;
      return announcement;
    });
  }

  toAnnouncement(proposal: Proposal, auth_user?: AccountInfo): Announcement {
    return {
      announcement_id: null,
      account_id: auth_user.account_id,
      title: `提案_${auth_user.nickname}`,
      content: proposal.title,
      date: new Date(),
      display_expiration_date: new Date('3000/03/30'),
      display_code_1: DisplayCodeOne.GROUP,
      display_code_2: auth_user.account_id,
      display_code_3: null, // account_id admin
      display_code_4: proposal.proposal_id, // proposal_id
      display_code_5: null,
      record_creation_date: new Date(),
      record_update_date: new Date(),
    } as Announcement;
  }

  async edit(
    proposal_id: number,
    update_proposal_dto: UpdateProposalDto,
    auth_user?: AccountInfo,
  ): Promise<ProposalDto> {
    let entity: Proposal = await super.findById(proposal_id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Proposal not exist');
    }
    entity.proposal_content = update_proposal_dto.proposal_content;
    entity.title = update_proposal_dto.title;
    entity.mi_id = update_proposal_dto.mi_id;
    entity.proposal_date = new Date();
    entity.update_date = new Date();
    entity = await super.update(proposal_id, entity);
    return {
      ...plainToClass(ProposalDto, entity),
      account_nickname: auth_user.nickname,
    };
  }

  async updatePoint(
    proposal_id: number,
    point: ProposalPoint,
    auth_user?: AccountInfo,
  ): Promise<ProposalDto> {
    let entity: Proposal = await super.findById(proposal_id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Proposal not exist');
    }
    entity.point = point;
    entity.update_date = new Date();
    entity = await super.update(proposal_id, entity);
    return {
      ...plainToClass(ProposalDto, entity),
      account_nickname: auth_user.nickname,
    };
  }

  async deleteById(proposal_id: number) {
    const entity: Proposal = await super.findById(proposal_id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Proposal not exist');
    }
    const announcements = await this.announcementService.getAllByDisplayCode4(
      proposal_id,
    );
    await getManager().transaction(async (em: EntityManager) => {
      await em.getCustomRepository(ProposalRepository).delete(proposal_id);
      if (announcements.length) {
        await em
          .getCustomRepository(AnnouncementRepository)
          .delete(announcements.map((anno) => anno.announcement_id));
      }
    });
    return plainToClass(ProposalDto, entity);
  }
}
