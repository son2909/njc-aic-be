import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_TORepository } from './D_TO.repository';
import { D_TOService } from './D_TO.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_TORepository])],
  providers: [D_TOService],
  exports: [D_TOService],
})
export class D_TOModule {}
