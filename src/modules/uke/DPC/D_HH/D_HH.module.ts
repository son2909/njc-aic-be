import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_HHRepository } from './D_HH.repository';
import { D_HHService } from './D_HH.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_HHRepository])],
  providers: [D_HHService],
  exports: [D_HHService],
})
export class D_HHModule {}
