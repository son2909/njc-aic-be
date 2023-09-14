import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuingQueryManagementRepository } from './issuing_query_management.repository';
import { IssuingQueryManagementService } from './issuing_query_management.service';
@Module({
  imports: [TypeOrmModule.forFeature([IssuingQueryManagementRepository])],
  providers: [IssuingQueryManagementService],
  exports: [IssuingQueryManagementService],
})
export class IssuingQueryManagementModule {}
