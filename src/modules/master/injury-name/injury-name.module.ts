import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuryNameRepository } from './injury-name.repository';
import { InjuryNameService } from './injury-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([InjuryNameRepository])],
  providers: [InjuryNameService],
  exports: [InjuryNameService],
})
export class InjuryNameModule {}
