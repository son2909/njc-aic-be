import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscontinuedDrugMService } from './discontinued-drug.service';
import { DiscontinuedDrugMRepository } from './discontinued-drug.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscontinuedDrugMRepository])],
  providers: [DiscontinuedDrugMService],
  exports: [DiscontinuedDrugMService],
})
export class DiscontinuedDrugMModule {}
