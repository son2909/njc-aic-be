import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SIRepository } from './SI.repository';
import { SIService } from './SI.service';

@Module({
  imports: [TypeOrmModule.forFeature([SIRepository])],
  providers: [SIService],
  exports: [SIService],
})
export class SIModule {}
