import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CORepository } from './CO.repository';
import { COService } from './CO.service';

@Module({
  imports: [TypeOrmModule.forFeature([CORepository])],
  providers: [COService],
  exports: [COService],
})
export class COModule {}
