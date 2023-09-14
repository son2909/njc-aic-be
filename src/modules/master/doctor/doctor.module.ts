import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';
import { DoctorService } from './doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorRepository])],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
