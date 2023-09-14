import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InclusiveRepository } from './inclusive.repository';
import { InclusiveService } from './inclusive.service';

@Module({
  imports: [TypeOrmModule.forFeature([InclusiveRepository])],
  providers: [InclusiveService],
  exports: [InclusiveService],
})
export class InclusiveModule {}
