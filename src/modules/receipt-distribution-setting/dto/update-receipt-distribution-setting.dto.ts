import { PartialType } from '@nestjs/swagger';
import { CreateReceiptDistributionSettingDto } from './create-receipt-distribution-setting.dto';

export class UpdateReceiptDistributionSettingDto extends PartialType(
  CreateReceiptDistributionSettingDto,
) {}
