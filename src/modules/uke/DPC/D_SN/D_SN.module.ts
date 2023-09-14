import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_SNRepository } from './D_SN.repository';
import { D_SNService } from './D_SN.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_SNRepository])],
  providers: [D_SNService],
  exports: [D_SNService],
})
export class D_SNModule {}
