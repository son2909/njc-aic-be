import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_IRRepository } from './D_IR.repository';
import { D_IRService } from './D_IR.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_IRRepository])],
  providers: [D_IRService],
  exports: [D_IRService],
})
export class D_IRModule {}
