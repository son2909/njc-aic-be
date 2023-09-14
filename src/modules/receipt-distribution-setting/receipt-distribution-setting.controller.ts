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
import { Role } from '../../enum';
import { Roles } from './../../decorators/roles.decorator';
import { CreateReceiptDistributionSettingDto } from './dto/create-receipt-distribution-setting.dto';
import { ReceiptDistributionSettingService } from './receipt-distribution-setting.service';

@ApiTags('Receipt distribution setting')
@ApiBearerAuth()
@Roles([Role.ADMIN])
@Controller('receipt-distribution-setting')
export class ReceiptDistributionSettingController {
  constructor(
    private readonly rdSettingService: ReceiptDistributionSettingService,
  ) {}

  @Get()
  async findAll(@AuthUser() authUser?: AccountInfo) {
    return this.rdSettingService.findAllCustom();
  }

  @ApiBody({
    type: CreateReceiptDistributionSettingDto,
  })
  @Post()
  async create(@Body() createRequest: CreateReceiptDistributionSettingDto) {
    return this.rdSettingService.create(createRequest);
  }

  @ApiBody({
    type: CreateReceiptDistributionSettingDto,
  })
  @Put(':setting_id')
  async update(
    @Param('setting_id') setting_id: number,
    @Body() createRequest: CreateReceiptDistributionSettingDto,
  ) {
    return this.rdSettingService.updateRd(setting_id, createRequest);
  }

  @Delete(':setting_id')
  async delete(@Param('setting_id') setting_id: number) {
    return this.rdSettingService.deleteThrow(
      setting_id,
      'Receipt distribution setting not exist',
    );
  }

  @Get(':setting_id')
  async getById(@Param('setting_id') setting_id: number) {
    return this.rdSettingService.getById(setting_id);
  }
}
