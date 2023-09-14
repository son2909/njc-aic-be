import { RERepository } from './RE.repository';
import { REService } from './RE.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RERepository])],
  providers: [REService],
  exports: [REService],
})
export class REModule {}
