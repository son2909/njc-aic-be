import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConflictRelatedRepository } from './conflict-related.repository';
import { ConflictRelatedService } from './conflict-related.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConflictRelatedRepository])],
  providers: [ConflictRelatedService],
  exports: [ConflictRelatedService],
})
export class ConflictRelatedModule {}
