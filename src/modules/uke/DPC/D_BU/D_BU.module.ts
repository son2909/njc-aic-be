import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_BURepository } from './D_BU.repository';
import { D_BUService } from './D_BU.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_BURepository])],
  providers: [D_BUService],
  exports: [D_BUService],
})
export class D_BUModule {}
