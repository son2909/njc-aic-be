import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SYRepository } from './SY.repository';
import { SYService } from './SY.service';

@Module({
  imports: [TypeOrmModule.forFeature([SYRepository])],
  providers: [SYService],
  exports: [SYService],
})
export class SYModule {}
