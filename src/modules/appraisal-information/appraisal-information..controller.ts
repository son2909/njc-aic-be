import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppraisalInformationService } from './appraisal-information.service';

@ApiTags('appraisal-information')
@ApiBearerAuth()
@Controller('appraisal-information')
export class AppraisalInformationController {
  constructor(
    private readonly appraisalInformationService: AppraisalInformationService,
  ) {}

  @Get('/reasons')
  async getAllReason() {
    return this.appraisalInformationService.getAllReason();
  }
}
