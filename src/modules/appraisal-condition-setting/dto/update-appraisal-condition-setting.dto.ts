import { PartialType } from '@nestjs/swagger';
import { CreateAppraisalConditionSettingDto } from './create-appraisal-condition-setting.dto';

export class UpdateAppraisalConditionSettingDto extends PartialType(
  CreateAppraisalConditionSettingDto,
) {}
