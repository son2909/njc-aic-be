import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_KORepository } from './D_KO.repository';
import { D_KOService } from './D_KO.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_KORepository])],
  providers: [D_KOService],
  exports: [D_KOService],
})
export class D_KOModule {}
