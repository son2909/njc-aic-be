import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JDRepository } from './JD.repository';
import { JDService } from './JD.service';

@Module({
  imports: [TypeOrmModule.forFeature([JDRepository])],
  providers: [JDService],
  exports: [JDService],
})
export class JDModule {}
