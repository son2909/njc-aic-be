import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_SKRepository } from './D_SK.repository';
import { D_SKService } from './D_SK.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_SKRepository])],
  providers: [D_SKService],
  exports: [D_SKService],
})
export class D_SKModule {}
