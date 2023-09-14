import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralDrugNameRepository } from './general-drug-name.repository';
import { GeneralDrugNameService } from './general-drug-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralDrugNameRepository])],
  providers: [GeneralDrugNameService],
  exports: [GeneralDrugNameService],
})
export class GeneralDrugNameModule {}
