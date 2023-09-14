import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IRService } from './IR.service';
import { IRRepository } from './IR.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IRRepository])],
  providers: [IRService],
  exports: [IRService],
})
export class IRModule {}
