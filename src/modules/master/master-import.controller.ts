import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountInfo } from '../../../src/common/account-info';
import { AuthUser } from '../../../src/decorators/auth.user.decorator';
import { Roles } from '../../../src/decorators/roles.decorator';
import { Role } from '../../../src/enum';
import { ImportResultDto } from '../../../src/media-storage/dto/import-result.dto';
import { FileImportDto } from '../../media-storage/dto/file-import.dto';
import { DetailMasterDto } from './dto/detail-master.dto';
import { SearchMasterResponseDto } from './dto/response/search-master-response.dto';
import { SearchMasterDto } from './dto/search-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { MasterImportService } from './master-import.service';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { PageDto } from '../../common/dto/pagination.dto';

@ApiTags('master-import')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
@Controller('master')
export class MasterImportController {
  constructor(private readonly masterImportService: MasterImportService) {}

  @Post('import-drugs-presence-absence-master')
  async importDrugPresenceAbsenceMaster(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importDrugPresenceAbsenceMaster(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-hospital-basic-charge-t')
  async importHospitalBasicCharge(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importHospitalBasicCharge(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-number-of-calculations-t')
  async importNumberOfCalculation(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importNumberOfCalculation(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-high-risk-drug-m')
  async importHighRiskDrugMaster(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importHighRiskDrugMaster(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-doctor-m')
  async importDoctorMaster(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importDoctorMaster(query.fileKey, authUser);
  }

  @Post('import-general-drug-name-m')
  async importGeneralDrugNameMaster(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importGeneralDrugNameMaster(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-inclusive-t')
  async importInclusive(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importInclusive(query.fileKey, authUser);
  }

  @Post('import-discontinued-drug-m')
  async importDiscontinuedDrugM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importDiscontinuedDrugM(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-auxiliary-t')
  async importAuxiliary(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importAuxiliary(query.fileKey, authUser);
  }

  @Post('import-medical-department-m')
  async importMedicalDepartmentM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importMedicalDepartmentM(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-ward-m')
  async importWardM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importWardM(query.fileKey, authUser);
  }

  @Post('import-comment-m')
  async importCommentM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importCommentM(query.fileKey, authUser);
  }

  @Post('import-abolish-medical-practice')
  async importAbolishMedicalPractice(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importAbolishMedicalPractice(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-conflict-related')
  async importConflictRelated(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importConflictRelated(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-facility-standard-medical')
  async importFacilityStandardMedical(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importFacilityStandardMedical(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-facility-standard-welfare')
  async importFacilityStandardWelfare(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importFacilityStandardWelfare(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-specific-equipment')
  async importSpecificEquipment(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importSpecificEquipment(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-pharmaceutical-m')
  async importPharmaceuticalM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importPharmaceuticalM(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-dispensing-act')
  async importDispensingAct(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importDispensingAct(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-payment-fund-medical-department-m')
  async importPaymentFundMedicalDepartmentM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importPaymentFundMedicalDepartmentM(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-modifier-m')
  async importModifierM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importModifierM(query.fileKey, authUser);
  }

  @Post('import-injury-name-m')
  async importInjuryNameM(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importInjuryNameM(query.fileKey, authUser);
  }

  @Post('import-medical-practice-m')
  async importMedicalPractice(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importMedicalPractice(
      query.fileKey,
      authUser,
    );
  }

  @Post('import-error-t')
  async importErrorT(
    @Query() query: FileImportDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<ImportResultDto> {
    return this.masterImportService.importMedicalPractice(
      query.fileKey,
      authUser,
    );
  }

  @Post('search')
  @Roles([Role.ADMIN])
  async search(
    @Body() body: SearchMasterDto,
    @Query() pageOptionsDto: PageOptionsDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<PageDto<SearchMasterResponseDto>> {
    return this.masterImportService.search(
      body.table,
      body.keyword,
      pageOptionsDto,
    );
  }

  @Get('detail')
  @Roles([Role.ADMIN])
  async detail(
    @Query() query: DetailMasterDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<any> {
    return this.masterImportService.detail(query.table, query.id);
  }

  @Put('update/:id')
  @Roles([Role.ADMIN])
  async update(
    @Param('id') id: number,
    @Body() body: UpdateMasterDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<PageDto<any>> {
    return this.masterImportService.update(body.table, id, body.data);
  }

  @Post('export')
  @Roles([Role.ADMIN])
  async export(
    @Body() body: SearchMasterDto,
    @AuthUser() authUser?: AccountInfo,
  ): Promise<any> {
    return this.masterImportService.export(body.table, body.keyword);
  }
}
