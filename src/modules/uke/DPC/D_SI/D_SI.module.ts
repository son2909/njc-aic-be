import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_SIRepository } from './D_SI.repository';
import { D_SIService } from './D_SI.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_SIRepository])],
  providers: [D_SIService],
  exports: [D_SIService],
})
export class D_SIModule {}
