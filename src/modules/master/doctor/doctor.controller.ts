import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';

@ApiTags('Doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async getAllAndSort() {
    return this.doctorService.getAllAndSort();
  }
}
