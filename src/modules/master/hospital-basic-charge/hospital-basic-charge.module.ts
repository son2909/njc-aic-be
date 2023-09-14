import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalBasicChargeTRepository } from './hospital-basic-charge.repository';
import { HospitalBasicChargeTService } from './hospital-basic-charge.service';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalBasicChargeTRepository])],
  providers: [HospitalBasicChargeTService],
  exports: [HospitalBasicChargeTService],
})
export class HospitalBasicChargeTModule {}
