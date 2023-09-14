import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_SYRepository } from './D_SY.repository';
import { D_SYService } from './D_SY.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_SYRepository])],
  providers: [D_SYService],
  exports: [D_SYService],
})
export class D_SYModule {}
