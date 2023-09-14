import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispensingActRepository } from './dispensing-act.repository';
import { DispensingActService } from './dispensing-act.service';

@Module({
  imports: [TypeOrmModule.forFeature([DispensingActRepository])],
  providers: [DispensingActService],
  exports: [DispensingActService],
})
export class DispensingActModule {}
