import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KORepository } from './KO.repository';
import { KOService } from './KO.service';

@Module({
  imports: [TypeOrmModule.forFeature([KORepository])],
  providers: [KOService],
  exports: [KOService],
})
export class KOModule {}
