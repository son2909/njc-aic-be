import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_JDRepository } from './D_JD.repository';
import { D_JDService } from './D_JD.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_JDRepository])],
  providers: [D_JDService],
  exports: [D_JDService],
})
export class D_JDModule {}
