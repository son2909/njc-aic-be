import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GRRepository } from './GR.repository';
import { GRService } from './GR.service';

@Module({
  imports: [TypeOrmModule.forFeature([GRRepository])],
  providers: [GRService],
  exports: [GRService],
})
export class GRModule {}
