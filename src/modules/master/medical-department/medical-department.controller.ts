import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../../src/decorators/roles.decorator';
import { Role } from '../../../../src/enum';
import { MedicalDepartmentService } from './medical-department.service';

@ApiTags('medical-department')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CHECKER])
@Controller('medical-department')
export class MedicalDepartmentController {
  constructor(
    private readonly medicalDepartmentService: MedicalDepartmentService,
  ) {}

  @Get()
  async getAllAndSort() {
    return this.medicalDepartmentService.getAllAndSort();
  }
}
