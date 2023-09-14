import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TORepository } from './TO.repository';
import { TOService } from './TO.service';

@Module({
  imports: [TypeOrmModule.forFeature([TORepository])],
  providers: [TOService],
  exports: [TOService],
})
export class TOModule {}
