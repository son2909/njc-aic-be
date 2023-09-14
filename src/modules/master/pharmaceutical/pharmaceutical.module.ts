import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmaceuticalMRepository } from './pharmaceutical.repository';
import { PharmaceuticalMService } from './pharmaceutical.service';

@Module({
  imports: [TypeOrmModule.forFeature([PharmaceuticalMRepository])],
  providers: [PharmaceuticalMService],
  exports: [PharmaceuticalMService],
})
export class PharmaceuticalMModule {}
