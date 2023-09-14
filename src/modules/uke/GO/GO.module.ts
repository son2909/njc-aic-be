import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GORepository } from './GO.repository';
import { GOService } from './GO.service';

@Module({
  imports: [TypeOrmModule.forFeature([GORepository])],
  providers: [GOService],
  exports: [GOService],
})
export class GOModule {}
