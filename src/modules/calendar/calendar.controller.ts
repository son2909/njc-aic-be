import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { SeacrhCalendarDto } from './dto/search-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@ApiTags('Calendar')
@ApiBearerAuth()
@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/group')
  async getCalendarGroup(@AuthUser() auth_user: AccountInfo) {
    return this.calendarService.getCalendarGroup(auth_user);
  }

  @ApiBody({
    type: CreateCalendarDto,
  })
  @Post()
  async create(
    @Body() create_calendar: CreateCalendarDto,
    @AuthUser() auth_user: AccountInfo,
  ) {
    return this.calendarService.create(create_calendar, auth_user);
  }

  @ApiBody({
    type: UpdateCalendarDto,
  })
  @Put(':calendar_id')
  async update(
    @Param('calendar_id') calendar_id: number,
    @Body() update_calendar: UpdateCalendarDto,
    @AuthUser() auth_user: AccountInfo,
  ) {
    return this.calendarService.updateById(
      calendar_id,
      update_calendar,
      auth_user,
    );
  }

  @Get(':calendar_id')
  async getById(@Param('calendar_id') calendar_id: number) {
    return this.calendarService.getById(calendar_id);
  }

  @Delete(':calendar_id')
  async deleteById(@Param('calendar_id') calendar_id: number) {
    return this.calendarService.deleteThrow(calendar_id, 'Calendar not exist');
  }

  @Post('/me')
  @ApiBody({
    type: SeacrhCalendarDto,
  })
  async getMyCalendar(
    @Body() request: SeacrhCalendarDto,
    @AuthUser() auth_user: AccountInfo,
  ) {
    return this.calendarService.getMyCalendar(request, auth_user);
  }
}
