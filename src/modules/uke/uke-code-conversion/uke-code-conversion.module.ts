import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UkeCodeConversionRepository } from './uke-code-conversion.repository';
import { UkeCodeConversionService } from './uke-code-conversion.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkeCodeConversionRepository])],
  providers: [UkeCodeConversionService],
  exports: [UkeCodeConversionService],
})
export class UkeCodeConversionModule {}
