import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_MFRepository } from './D_MF.repository';
import { D_MFService } from './D_MF.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_MFRepository])],
  providers: [D_MFService],
  exports: [D_MFService],
})
export class D_MFModule {}
