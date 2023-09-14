import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MFRepository } from './MF.repository';
import { MFService } from './MF.service';

@Module({
  imports: [TypeOrmModule.forFeature([MFRepository])],
  providers: [MFService],
  exports: [MFService],
})
export class MFModule {}
