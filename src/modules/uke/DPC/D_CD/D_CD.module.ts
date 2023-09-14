import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_CDRepository } from './D_CD.repository';
import { D_CDService } from './D_CD.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_CDRepository])],
  providers: [D_CDService],
  exports: [D_CDService],
})
export class D_CDModule {}
