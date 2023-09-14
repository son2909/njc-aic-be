import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_HORepository } from './D_HO.repository';
import { D_HOService } from './D_HO.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_HORepository])],
  providers: [D_HOService],
  exports: [D_HOService],
})
export class D_HOModule {}
