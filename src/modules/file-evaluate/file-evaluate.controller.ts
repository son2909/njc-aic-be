import { Controller, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../common/account-info';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import { FileImportDto } from '../../media-storage/dto/file-import.dto';
import { ImportResultDto } from '../../media-storage/dto/import-result.dto';
import { FileEvaluateService } from './../file-evaluate/file-evaluate.service';
import { AIImportExcelDto } from './dto/ai-import-excel.dto';

@ApiTags('file-evaluate-import')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
@Controller('file-evaluate')
export class FileEvaluateController {
  constructor(private fileEvaluateService: FileEvaluateService) {}

  @Post('/import-appraisal-information')
  async importAppraisalInformation(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.fileEvaluateService.importAppraisalInformation(
      query.fileKey,
      authUser,
    );
  }

  @Post('/import-assessment-pdf')
  async importAssessmentPDF(
    @Query() query: AIImportExcelDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.fileEvaluateService.importReceiptInformation(
      query.fileKey,
      query.mi_id,
      authUser,
    );
  }
}
