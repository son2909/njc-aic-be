import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import {
  PartialUpdateReceiptDto,
  ReceiptInformationIdsDto,
} from './dto/receipt-information-tbl.dto';
import { SearchReceiptRequestDto } from './dto/search-receipt-tbl.request.dto';
import { ReceiptInformationService } from './receipt-information.service';
import { ReceiptInformationListDto } from './dto/receipt-information-list.dto';

@Controller('receipt-information')
@ApiTags('Receipt Information')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
export class ReceiptInformationController {
  constructor(private receiptInfoService: ReceiptInformationService) {}

  @ApiBody({
    type: SearchReceiptRequestDto,
  })
  @Post('/search')
  async getReceiptListTbl(
    @Body() searchReq: SearchReceiptRequestDto,
    @Query() pageOptionsDto: PageOptionsDto,
    @AuthUser() authUser: AccountInfo,
  ) {
    return this.receiptInfoService.getReceiptListTbl(
      searchReq,
      pageOptionsDto,
      authUser,
    );
  }

  @Get('/list')
  async getAllReceiptListTbl() {
    return this.receiptInfoService.getAll();
  }

  @Get('/detail/:receipt_information_id')
  async getReceiptDetail(
    @Param('receipt_information_id') receipt_information_id: number,
  ) {
    return this.receiptInfoService.getReceiptDetail(receipt_information_id);
  }

  @Patch('/partial-update/:receipt_information_id')
  async partialUpdateReceiptDetail(
    @Param('receipt_information_id') receipt_information_id: number,
    @Body() partialUpdateReceipt: PartialUpdateReceiptDto,
  ) {
    return this.receiptInfoService.patchUpdate(
      receipt_information_id,
      partialUpdateReceipt,
    );
  }

  @Post('/export-pdf')
  async exportPdf(@Body() payload: ReceiptInformationIdsDto) {
    return this.receiptInfoService.exportPdf(payload.receipt_information_ids);
  }

  @Get('/export-zip')
  async exportZip() {
    return this.receiptInfoService.exportZip();
  }

  @Post('/list')
  async getReceiptListByDelivery(
    @Body() receiptInformationListDto: ReceiptInformationListDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.receiptInfoService.getReceiptListByDelivery(
      receiptInformationListDto,
      pageOptionsDto,
    );
  }
}
