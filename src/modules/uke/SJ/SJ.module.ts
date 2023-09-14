import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SJRepository } from './SJ.repository';
import { SJService } from './SJ.service';

@Module({
  imports: [TypeOrmModule.forFeature([SJRepository])],
  providers: [SJService],
  exports: [SJService],
})
export class SJModule {}
