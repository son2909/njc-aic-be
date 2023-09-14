import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_GORepository } from './D_GO.repository';
import { D_GOService } from './D_GO.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_GORepository])],
  providers: [D_GOService],
  exports: [D_GOService],
})
export class D_GOModule {}
