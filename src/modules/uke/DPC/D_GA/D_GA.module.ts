import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_GARepository } from './D_GA.repository';
import { D_GAService } from './D_GA.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_GARepository])],
  providers: [D_GAService],
  exports: [D_GAService],
})
export class D_GAModule {}
