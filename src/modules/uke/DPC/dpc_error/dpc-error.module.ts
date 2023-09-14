import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DpcErrorRepository } from './dpc-error.repository';
import { DpcErrorService } from './dpc-error.service';

@Module({
  imports: [TypeOrmModule.forFeature([DpcErrorRepository])],
  providers: [DpcErrorService],
  exports: [DpcErrorService],
})
export class DpcErrorModule {}
