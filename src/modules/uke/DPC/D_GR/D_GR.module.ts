import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_GRRepository } from './D_GR.repository';
import { D_GRService } from './D_GR.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_GRRepository])],
  providers: [D_GRService],
  exports: [D_GRService],
})
export class D_GRModule {}
