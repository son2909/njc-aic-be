import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificEquipmentMRepository } from './specific-equipment.repository';
import { SpecificEquipmentMService } from './specific-equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificEquipmentMRepository])],
  providers: [SpecificEquipmentMService],
  exports: [SpecificEquipmentMService, TypeOrmModule],
})
export class SpecificEquipmentMModule {}
