import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_GTRepository } from './D_GT.repository';
import { D_GTService } from './D_GT.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_GTRepository])],
  providers: [D_GTService],
  exports: [D_GTService],
})
export class D_GTModule {}
