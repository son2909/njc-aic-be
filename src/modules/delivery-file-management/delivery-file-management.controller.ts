import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { DeliveryFileManagementService } from './delivery-file-management.service';
import { DeliveryDistributedReceiptDto } from './dto/delivery-distributed-receipt.dto';
import { ExportInvoiceDto } from './dto/response/delivery-export-invoice.dto copy';
import { SearchDeliveryRequestDto } from './dto/search-delivery-tbl.request.dto';
import { SearchReceiptHopistalRequestDto } from './dto/search-reciept-hopistal.request.dto';
import { UpdateCompleteFlagDto } from './dto/update-complete-flag.dto';
import { UpdateStatusDeliveryDto } from './dto/update-status-delivery.dto';

@Controller('delivery')
@ApiTags('Delivery management')
@ApiBearerAuth()
// TODO: by pass role controller
// @Roles([Role.ADMIN, Role.CHECKER])
export class DeliveryFileManagementController {
  constructor(
    private readonly deliveryFileManagementService: DeliveryFileManagementService,
  ) {}

  @Get('/group')
  async getReceiptListGroup(@AuthUser() authUser: AccountInfo) {
    return this.deliveryFileManagementService.getReceiptListGroup(authUser);
  }

  @Put(':delivery_id/completion-flag')
  async updateCompletionFlag(
    @Param('delivery_id') delivery_id: number,
    @Body() request: UpdateCompleteFlagDto,
    @AuthUser() authUser?: AccountInfo,
  ) {
    return this.deliveryFileManagementService.updateCompletionFlag(
      delivery_id,
      request,
      authUser,
    );
  }

  @Get('/distributed')
  async getDistributed(@Query() pageOptionsDto: PageOptionsDto) {
    return this.deliveryFileManagementService.findByDistributed(pageOptionsDto);
  }

  @Put('/distributed/:delivery_id')
  async distributedDelivery(@Param('delivery_id') delivery_id: number) {
    return this.deliveryFileManagementService.distributed(delivery_id);
  }

  @Put('/distributed/receipt/assign')
  async distributedReceipt(@Body() request: DeliveryDistributedReceiptDto) {
    return this.deliveryFileManagementService.distributedReceipt(request);
  }

  @Get()
  async getListDelivery(@Query() pageOptionsDto: PageOptionsDto) {
    return this.deliveryFileManagementService.getListDelivery(pageOptionsDto);
  }

  @Put()
  async updateStatusDelivery(@Body() request: UpdateStatusDeliveryDto) {
    return this.deliveryFileManagementService.updateStatusDelivery(request);
  }

  @Post('/invoice')
  async getInvoiceInfo(@Body() request) {
    return this.deliveryFileManagementService.getInvoiceInfo(request.ids);
  }

  @Post('/export-invoice')
  async generatePDF(@Body() request: ExportInvoiceDto) {
    return this.deliveryFileManagementService.generatePDF(request);
  }

  @Post('/search-medical')
  async searchHospital(
    @Body() payload: SearchReceiptHopistalRequestDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.deliveryFileManagementService.searchHospital(
      payload,
      pageOptionsDto,
    );
  }

  @Post('/search')
  async getDeliveryListTbl(
    @Body() searchReq: SearchDeliveryRequestDto,
    @Query() pageOptionsDto: PageOptionsDto,
    // @AuthUser() authUser: AccountInfo,
  ) {
    return this.deliveryFileManagementService.getDeliveryListTbl(
      searchReq,
      pageOptionsDto,
    );
  }
}
