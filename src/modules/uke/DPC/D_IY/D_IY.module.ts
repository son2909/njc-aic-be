import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_IYRepository } from './D_IY.repository';
import { D_IYService } from './D_IY.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_IYRepository])],
  providers: [D_IYService],
  exports: [D_IYService],
})
export class D_IYModule {}
