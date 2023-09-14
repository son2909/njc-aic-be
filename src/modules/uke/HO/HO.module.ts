import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HORepository } from './HO.repository';
import { HOService } from './HO.service';

@Module({
  imports: [TypeOrmModule.forFeature([HORepository])],
  providers: [HOService],
  exports: [HOService],
})
export class HOModule {}
