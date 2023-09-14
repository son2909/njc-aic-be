import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuxiliaryRepository } from './auxiliary.repository';
import { AuxiliaryService } from './auxiliary.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuxiliaryRepository])],
  providers: [AuxiliaryService],
  exports: [AuxiliaryService],
})
export class AuxiliaryModule {}
