import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_SJRepository } from './D_SJ.repository';
import { D_SJService } from './D_SJ.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_SJRepository])],
  providers: [D_SJService],
  exports: [D_SJService],
})
export class D_SJModule {}
