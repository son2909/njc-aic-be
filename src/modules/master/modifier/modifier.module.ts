import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModifierRepository } from './modifier.repository';
import { ModifierService } from './modifier.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModifierRepository])],
  providers: [ModifierService],
  exports: [ModifierService],
})
export class ModifierModule {}
