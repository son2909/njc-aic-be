import { SYService } from './SY/SY.service';
import { DpcErrorService } from './DPC/dpc_error/dpc-error.service';
import { ErrorTService } from './error/error.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import { Body, Controller, Patch, Post, Query } from '@nestjs/common';
import { UkeImportService } from './uke-import.service';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { FileImportDto } from '../../media-storage/dto/file-import.dto';
import { AccountInfo } from '../../common/account-info';
import {
  AddCommentUkeTblDto,
  PartialUpdateErrorDto,
  PayloadUkeDto,
} from './dto/uke-import.dto';
import { SIService } from './SI/SI.service';
import { IYService } from './IY/IY.service';
import { COService } from './CO/CO.service';
import { TOService } from './TO/TO.service';
import { SJService } from './SJ/SJ.service';
import { D_SYService } from './DPC/D_SY/D_SY.service';
import { D_SIService } from './DPC/D_SI/D_SI.service';
import { D_IYService } from './DPC/D_IY/D_IY.service';
import { D_COService } from './DPC/D_CO/D_CO.service';
import { D_TOService } from './DPC/D_TO/D_TO.service';
import { D_SJService } from './DPC/D_SJ/D_SJ.service';
import { MedicalDPCFlagEnum } from '../receipt-information/enum';

@ApiTags('uke-import')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
@Controller('uke')
export class UkeImportController {
  constructor(
    private readonly ukeImportService: UkeImportService,
    private readonly errorTService: ErrorTService,
    private readonly dpcErrorService: DpcErrorService,
    private readonly sYService: SYService,
    private readonly sIService: SIService,
    private readonly iYService: IYService,
    private readonly cOService: COService,
    private readonly tOService: TOService,
    private readonly sJService: SJService,
    private readonly d_SYService: D_SYService,
    private readonly d_SIService: D_SIService,
    private readonly d_IYService: D_IYService,
    private readonly d_COService: D_COService,
    private readonly d_TOService: D_TOService,
    private readonly d_SJService: D_SJService,
  ) {}

  @Post('import-uke-code-conversion-m')
  async importCodeConversionUke(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<boolean> {
    await this.ukeImportService.importCodeConversionUke(
      query.fileKey,
      authUser,
    );
    return true;
  }

  @Post('import-uke-insurance-receipt')
  async importInsuranceReceiptUke(
    @Query() query: FileImportDto,
    @AuthUser() authUser: AccountInfo,
    @Body() body: PayloadUkeDto,
  ): Promise<boolean> {
    await this.ukeImportService.importInsuranceReceiptUke(
      query.fileKey,
      authUser,
      body,
    );
    return true;
  }

  @Post('import-uke-insurance-dpc-receipt')
  async importInsuranceDPCReceiptUke(
    @Query() query: FileImportDto,
    @AuthUser() authUser: AccountInfo,
    @Body() body: PayloadUkeDto,
  ): Promise<boolean> {
    await this.ukeImportService.importInsuranceDPCReceiptUke(
      query.fileKey,
      authUser,
      body,
    );
    return true;
  }

  @Patch('error-t/partial-update')
  async partialUpdateReceiptDetail(
    @Body() partialUpdateError: PartialUpdateErrorDto,
  ) {
    if (partialUpdateError.type === MedicalDPCFlagEnum.MEDICAL)
      return this.errorTService.partialUpdateMany(partialUpdateError.data);

    return this.dpcErrorService.partialUpdateMany(partialUpdateError.data);
  }

  @Patch('sy-t/add-comment')
  async addCommentSy(@Body() body: AddCommentUkeTblDto) {
    if (body.type === MedicalDPCFlagEnum.MEDICAL)
      return this.sYService.partialUpdateMany(body.data);

    return this.d_SYService.partialUpdateMany(body.data);
  }

  @Patch('si-t/add-comment')
  async addCommentSI(@Body() body: AddCommentUkeTblDto) {
    if (body.type === MedicalDPCFlagEnum.MEDICAL)
      return this.sIService.partialUpdateMany(body.data);

    return this.d_SIService.partialUpdateMany(body.data);
  }

  @Patch('iy-t/add-comment')
  async addCommentIY(@Body() body: AddCommentUkeTblDto) {
    if (body.type === MedicalDPCFlagEnum.MEDICAL)
      return this.iYService.partialUpdateMany(body.data);

    return this.d_IYService.partialUpdateMany(body.data);
  }

  @Patch('to-t/add-comment')
  async addCommentTO(@Body() body: AddCommentUkeTblDto) {
    if (body.type === MedicalDPCFlagEnum.MEDICAL)
      return this.tOService.partialUpdateMany(body.data);

    return this.d_TOService.partialUpdateMany(body.data);
  }

  @Patch('co-t/add-comment')
  async addCommentCO(@Body() body: AddCommentUkeTblDto) {
    if (body.type === MedicalDPCFlagEnum.MEDICAL)
      return this.cOService.partialUpdateMany(body.data);

    return this.d_COService.partialUpdateMany(body.data);
  }

  @Patch('sj-t/add-comment')
  async addCommentSJ(@Body() body: AddCommentUkeTblDto) {
    if (body.type === MedicalDPCFlagEnum.MEDICAL)
      return this.sJService.partialUpdateMany(body.data);

    return this.d_SJService.partialUpdateMany(body.data);
  }
}
