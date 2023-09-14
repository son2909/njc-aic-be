import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto';
import { AppraisalConditionSettingService } from './appraisal-condition-setting.service';
import { CreateAppraisalConditionSettingDto } from './dto/create-appraisal-condition-setting.dto';

@ApiTags('announcement')
@ApiBearerAuth()
@Controller('appraisal-condition-setting')
export class AppraisalConditionSettingController {
  constructor(
    private readonly appraisalConditionSettingService: AppraisalConditionSettingService,
  ) {}

  @Get()
  async search(@Query() pageOptionsDto: PageOptionsDto) {
    return this.appraisalConditionSettingService.search(pageOptionsDto);
  }

  @ApiBody({
    type: CreateAppraisalConditionSettingDto,
  })
  @Post()
  async create(@Body() request: CreateAppraisalConditionSettingDto) {
    return this.appraisalConditionSettingService.create(request);
  }

  @Put(':setting_id')
  async update(
    @Param('setting_id') setting_id: number,
    @Body() request: CreateAppraisalConditionSettingDto,
  ) {
    return this.appraisalConditionSettingService.updateById(
      setting_id,
      request,
    );
  }

  @Get(':setting_id')
  async getById(@Param('setting_id') setting_id: number) {
    return this.appraisalConditionSettingService.getById(setting_id);
  }

  @Delete(':setting_id')
  async delete(@Param('setting_id') setting_id: number) {
    return this.appraisalConditionSettingService.deleteThrow(
      setting_id,
      'Setting not exist',
    );
  }

  @Get('/identification/clinical')
  async getAllClinicalIdentification(
    @Query('identification') identification: string,
  ) {
    return this.appraisalConditionSettingService.getClinicalIdentification(
      identification,
    );
  }

  @Get('/computer/code')
  async getAllComputer(@Query('identification') identification: string) {
    return this.appraisalConditionSettingService.getComputer(identification);
  }
}
