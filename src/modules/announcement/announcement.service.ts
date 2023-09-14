import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { LessThanOrEqual } from 'typeorm';
import { AccountInfo } from '../../../src/common/account-info';
import { PageMetaDto } from '../../../src/common/dto/pagination-meta.dto';
import { PageOptionsDto } from '../../../src/common/dto/pagination-options.dto';
import { PageDto } from '../../../src/common/dto/pagination.dto';
import { Order, Role } from '../../../src/enum';
import { ApiError } from '../../../src/filter/api.error';
import { BaseService } from '../../../src/utils/base.service';
import { AccountService } from '../accounts/accounts.service';
import { AnnouncementRepository } from './announcement.repository';
import { AnnouncementDto } from './dto/announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { DisplayCodeOne } from './dto/enum/announcement-display-1.enum';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';
@Injectable()
export class AnnouncementService extends BaseService<Announcement> {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepo: AnnouncementRepository,
    private readonly accountService: AccountService,
  ) {
    super(announcementRepo);
  }

  async getMyAnnouncement(
    pageOptionsDto: PageOptionsDto,
    authUser?: AccountInfo,
  ) {
    return this.getPagingByInDisplayCode1(
      pageOptionsDto,
      this.getRoleDisplayCode1(authUser.account_classification),
      authUser,
    );
  }

  async findAllAndPaging(pageOptionsDto: PageOptionsDto) {
    const [entities, itemCount] = await this.announcementRepo.findAndCount({
      order: {
        record_creation_date: Order.DESC,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.limit,
    });
    const data = entities.map((entity) => {
      return plainToClass(AnnouncementDto, entity);
    });
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async create(createRequest: CreateAnnouncementDto, authUser?: AccountInfo) {
    const entity = await this.announcementRepo.save({
      ...plainToClass(Announcement, createRequest),
      date: new Date(),
      record_creation_date: new Date(),
      record_update_date: new Date(),
      account_id: authUser.account_id,
    });
    return plainToClass(CreateAnnouncementDto, entity);
  }

  async edit(id: number, updateRequest: UpdateAnnouncementDto) {
    let entity: Announcement = await super.findById(id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Announcement not exist');
    }
    entity.title = updateRequest.title;
    entity.content = updateRequest.content;
    entity.display_code_1 = updateRequest.display_code_1;
    entity.display_expiration_date = updateRequest.display_expiration_date;
    entity.record_update_date = new Date();
    entity = await super.update(id, entity);
    return plainToClass(AnnouncementDto, entity);
  }

  async getById(id: number) {
    let entity: Announcement = await super.findById(id);
    if (!entity) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Announcement not exist');
    }
    const result = plainToClass(AnnouncementDto, entity);
    const account = await this.accountService.findById(entity.account_id);
    if (account) {
      result.account_id = account.account_id;
      result.account_nickname = account.nickname;
    }
    return result;
  }

  async getAllByDisplayCode4(display_code_4: number): Promise<Announcement[]> {
    return this.announcementRepo.find({
      where: {
        display_code_4,
      },
    });
  }

  async getPagingByInDisplayCode1(
    pageOptionsDto: PageOptionsDto,
    display_code_1: DisplayCodeOne[],
    authUser?: AccountInfo,
  ) {
    const itemResult = await this.announcementRepo.countMyAnnouncement(
      display_code_1,
      authUser.account_id,
    );
    const itemCount = itemResult[0].itemCount || 0;
    const entities = await this.announcementRepo.getMyAnnouncement(
      pageOptionsDto,
      display_code_1,
      authUser.account_id,
    );
    const data = entities.map((entity) => {
      return plainToClass(AnnouncementDto, entity);
    });
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async getExternal(pageOptionsDto: PageOptionsDto) {
    const [entities, itemCount] = await this.announcementRepo.findAndCount({
      where: {
        display_code_1: DisplayCodeOne.EXTERNAL,
        display_expiration_date: LessThanOrEqual(new Date()),
      },
      order: {
        record_creation_date: Order.DESC,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.limit,
    });
    const data = entities.map((entity) => {
      return plainToClass(AnnouncementDto, entity);
    });

    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  getRoleDisplayCode1(account_classification: any) {
    if (account_classification === Role.ADMIN)
      return [
        DisplayCodeOne.COMPANY,
        DisplayCodeOne.SYSTEM,
        DisplayCodeOne.CUSTOMER,
      ];
    if (account_classification === Role.CHECKER)
      return [DisplayCodeOne.COMPANY, DisplayCodeOne.SYSTEM];
    return [DisplayCodeOne.COMPANY];
  }
}
