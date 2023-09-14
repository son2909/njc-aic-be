import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SNRepository } from './SN.repository';
import { SNService } from './SN.service';

@Module({
  imports: [TypeOrmModule.forFeature([SNRepository])],
  providers: [SNService],
  exports: [SNService],
})
export class SNModule {}
