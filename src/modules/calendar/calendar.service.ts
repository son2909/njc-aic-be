import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Role } from '../../enum';
import { ApiError } from '../../filter/api.error';
import { BaseService } from '../../utils/base.service';
import {
  MAP_COLOR,
  dateToNumberFormat,
  getFirstDayInMonth,
  getLastDayInMonth,
  toDate,
} from '../../utils/helper';
import { GroupManagementService } from '../group-management/group-management.service';
import { AccountInfo } from './../../common/account-info';
import { CalendarRepository } from './calendar.repository';
import { CalendarDto } from './dto/calendar.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { SeacrhCalendarDto } from './dto/search-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';

@Injectable()
export class CalendarService extends BaseService<Calendar> {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: CalendarRepository,
    private groupService: GroupManagementService,
  ) {
    super(calendarRepository);
  }

  async create(create_calendar: CreateCalendarDto, auth_user?: AccountInfo) {
    const entity = plainToClass(Calendar, create_calendar);
    entity.account_id = auth_user.account_id;
    entity.account_classification = parseInt(auth_user.account_classification);
    entity.registration_date = new Date();
    entity.start_time = dateToNumberFormat(
      create_calendar.start_date,
      'HHmmss',
    );
    entity.ending_time = dateToNumberFormat(create_calendar.end_date, 'HHmmss');
    entity.display_code_1 = 1;
    await this.calendarRepository.save(entity);
    return this._returnCalendarDto(entity);
  }

  async getById(calendar_id: number) {
    const entity = await this.findById(calendar_id);
    if (!entity)
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Calendar not exist');
    return this._returnCalendarDto(entity);
  }

  async updateById(
    calendar_id: number,
    update_calendar: UpdateCalendarDto,
    auth_user?: AccountInfo,
  ) {
    const entity = await this.findById(calendar_id);
    if (!entity)
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Calendar not exist');
    entity.content = update_calendar.content;
    entity.start_date = update_calendar.start_date;
    entity.end_date = update_calendar.end_date;
    entity.start_time = dateToNumberFormat(
      update_calendar.start_date,
      'HHmmss',
    );
    entity.ending_time = dateToNumberFormat(update_calendar.end_date, 'HHmmss');
    this.updateDisplayCode(update_calendar.display_code, entity, auth_user);
    await this.calendarRepository.save(entity);
    return this._returnCalendarDto(entity);
  }

  updateDisplayCode(
    display_code: number,
    entity: Calendar,
    auth_user?: AccountInfo,
  ) {
    const account_classification = parseInt(auth_user.account_classification);
    if (
      account_classification === Role.ADMIN ||
      account_classification === Role.CHECKER
    ) {
      if (display_code === -2) {
        entity.display_code_1 = 1;
        entity.display_code_2 = null;
        entity.display_code_3 = null;
      }
      if (display_code === -1) {
        entity.display_code_1 = null;
        entity.display_code_2 = 1;
        entity.display_code_3 = null;
      }
      if (display_code > 0) {
        entity.display_code_1 = null;
        entity.display_code_2 = null;
        entity.display_code_3 = display_code;
      }
    }
  }

  async getMyCalendar(request: SeacrhCalendarDto, auth_user: AccountInfo) {
    const account_id: number =
      parseInt(auth_user.account_classification) === Role.ADMIN
        ? null
        : auth_user.account_id;
    const qb = this.calendarRepository
      .createQueryBuilder()
      .select('*')
      .where(
        `start_date >= :start_date 
        AND end_date <= :end_date 
        AND start_time >= 0 
        AND ending_time <= 235959`,
        {
          start_date: getFirstDayInMonth(request.month, request.year),
          end_date: getLastDayInMonth(request.month, request.year),
        },
      );
    if (account_id) {
      qb.andWhere('account_id = :account_id', { account_id: account_id });
    }
    if (request.groupIds && request.groupIds.length) {
      let append = 'display_code_3 IN (:...groupIds)';
      if (request.groupIds.find((e) => e === -2)) {
        append += ' OR display_code_1 = 1';
      }
      if (request.groupIds.find((e) => e === -1)) {
        append += ' OR display_code_2 = 1';
      }
      qb.andWhere(append, { groupIds: request.groupIds });
    }
    const entities = await qb.getRawMany<Calendar>();
    return Promise.all(entities.map((e) => this._returnCalendarDto(e)));
  }

  buildCondition(request: SeacrhCalendarDto, account_id: number) {
    const conditions = {
      start_date: MoreThanOrEqual(
        getFirstDayInMonth(request.month, request.year),
      ),
      end_date: LessThanOrEqual(getLastDayInMonth(request.month, request.year)),
      start_time: MoreThanOrEqual(0),
      ending_time: LessThanOrEqual(235959),
    };
    if (account_id) {
      conditions['account_id'] = account_id;
    }
    if (request.groupIds && request.groupIds.length) {
      if (request.groupIds.find((e) => e === -2)) {
        conditions['display_code_1'] = 1;
      }
      if (request.groupIds.find((e) => e === -1)) {
        conditions['display_code_2'] = 1;
      }
      conditions['display_code_3'] = In(request.groupIds);
    }
    return conditions;
  }

  async _returnCalendarDto(entity: Calendar): Promise<CalendarDto> {
    const calendarDto = plainToClass(CalendarDto, entity, {
      excludeExtraneousValues: true,
    });
    calendarDto.start_datetime = toDate(
      calendarDto.start_date,
      calendarDto.start_time,
    );
    calendarDto.end_datetime = toDate(
      calendarDto.end_date,
      calendarDto.ending_time,
    );
    if (entity.display_code_1 || entity.display_code_2) {
      calendarDto.color = '#EA5852';
      if (entity.display_code_1) calendarDto.display_code = -2;
      if (entity.display_code_2) calendarDto.display_code = -1;
    }
    if (entity.display_code_3) {
      const group = await this.groupService.findById(entity.display_code_3);
      calendarDto.color = MAP_COLOR.get(group.color) || '#EA8134';
      calendarDto.display_code = group.group_id;
    }
    return calendarDto;
  }

  async getCalendarGroup(auth_user: AccountInfo) {
    const account_classification = parseInt(auth_user.account_classification);
    if (account_classification === Role.ADMIN) {
      return this.groupService.findAll();
    } else {
      return this.groupService.getListGroups(auth_user);
    }
  }
}
