import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppraisalInformationController } from './appraisal-information..controller';
import { AppraisalInformationRepository } from './appraisal-information.repository';
import { AppraisalInformationService } from './appraisal-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppraisalInformationRepository])],
  providers: [AppraisalInformationService],
  exports: [AppraisalInformationService],
  controllers: [AppraisalInformationController],
})
export class AppraisalInformationModule {}
