import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_SBRepository } from './D_SB.repository';
import { D_SBService } from './D_SB.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_SBRepository])],
  providers: [D_SBService],
  exports: [D_SBService],
})
export class D_SBModule {}
