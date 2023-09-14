import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_KKRepository } from './D_KK.repository';
import { D_KKService } from './D_KK.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_KKRepository])],
  providers: [D_KKService],
  exports: [D_KKService],
})
export class D_KKModule {}
