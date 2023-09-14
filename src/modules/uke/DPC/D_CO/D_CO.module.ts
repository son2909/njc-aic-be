import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { D_CORepository } from './D_CO.repository';
import { D_COService } from './D_CO.service';

@Module({
  imports: [TypeOrmModule.forFeature([D_CORepository])],
  providers: [D_COService],
  exports: [D_COService],
})
export class D_COModule {}
