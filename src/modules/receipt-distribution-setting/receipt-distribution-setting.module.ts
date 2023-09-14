import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptDistributionSettingController } from './receipt-distribution-setting.controller';
import { ReceiptDistributionSettingRepository } from './receipt-distribution-setting.repository';
import { ReceiptDistributionSettingService } from './receipt-distribution-setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiptDistributionSettingRepository])],
  controllers: [ReceiptDistributionSettingController],
  providers: [ReceiptDistributionSettingService],
  exports: [ReceiptDistributionSettingService],
})
export class ReceiptDistributionSettingModule {}
