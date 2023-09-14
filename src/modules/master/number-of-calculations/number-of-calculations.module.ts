import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NumberOfCalculationsTService } from './number-of-calculations.service';
import { NumberOfCalculationsTRepository } from './number-of-calculations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NumberOfCalculationsTRepository])],
  providers: [NumberOfCalculationsTService],
  exports: [NumberOfCalculationsTService],
})
export class NumberOfCalculationsTModule {}
