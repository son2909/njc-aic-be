import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorTRepository } from './error.repository';
import { ErrorTService } from './error.service';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorTRepository])],
  providers: [ErrorTService],
  exports: [ErrorTService],
})
export class ErrorTModule {}
