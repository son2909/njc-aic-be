import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IYRepository } from './IY.repository';
import { IYService } from './IY.service';

@Module({
  imports: [TypeOrmModule.forFeature([IYRepository])],
  providers: [IYService],
  exports: [IYService],
})
export class IYModule {}
