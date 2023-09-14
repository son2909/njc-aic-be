import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from '../../../enum';
import { REService } from './RE.service';
import { PatientDto } from './dto/patient.dto';

@ApiTags('re')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
@Controller('re')
export class REController {
  constructor(private readonly reService: REService) {}

  @Get('get-patient')
  async getPatient(): Promise<PatientDto[]> {
    return this.reService.findAllPatient();
  }
}
