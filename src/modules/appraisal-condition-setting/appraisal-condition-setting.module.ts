import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppraisalConditionSettingController } from './appraisal-condition-setting.controller';
import { AppraisalConditionSettingRepository } from './appraisal-condition-setting.repository';
import { AppraisalConditionSettingService } from './appraisal-condition-setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppraisalConditionSettingRepository])],
  controllers: [AppraisalConditionSettingController],
  providers: [AppraisalConditionSettingService],
  exports: [AppraisalConditionSettingService],
})
export class AppraisalConditionSettingModule {}
