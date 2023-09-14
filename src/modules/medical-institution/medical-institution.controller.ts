import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicalInstitutionDto } from './dto/response/medical-institution.dto';
import { MedicalInstitutionService } from './medical-institution.service';

@ApiTags('medical-institution')
@ApiBearerAuth()
@Controller('medical-institutions')
export class MedicalInstitutionController {
  constructor(
    private readonly medicalInstitutionService: MedicalInstitutionService,
  ) {}

  @Get()
  @ApiResponse({
    type: Array<MedicalInstitutionDto>,
  })
  async findAll(): Promise<MedicalInstitutionDto[]> {
    return this.medicalInstitutionService.findAllAndSort();
  }
}
