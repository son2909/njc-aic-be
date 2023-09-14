import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_REService } from './D_RE.service';
import { D_RERepository } from './D_RE.repository';

@Module({
  imports: [TypeOrmModule.forFeature([D_RERepository])],
  providers: [D_REService],
  exports: [D_REService],
})
export class D_REModule {}
