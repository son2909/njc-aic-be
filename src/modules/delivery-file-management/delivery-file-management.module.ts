import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryFileLinkModule } from '../delivery-file-link/delivery-file-link.module';
import { DeliveryFileLinkService } from '../delivery-file-link/delivery-file-link.service';
import { InvoiceService } from '../invoice/invoice.service';
import { ReceiptDistributionSettingModule } from '../receipt-distribution-setting/receipt-distribution-setting.module';
import { ReceiptInformationModule } from '../receipt-information/receipt-information.module';
import { DeliveryFileManagementController } from './delivery-file-management.controller';
import { DeliveryFileManagementRepository } from './delivery-file-management.repository';
import { DeliveryFileManagementService } from './delivery-file-management.service';
import { InvoiceModule } from '../invoice/invoice.module';
import { InvoiceRepository } from '../invoice/invoice.repository';
import { DeliveryFileLinkRepository } from '../delivery-file-link/delivery-file-link.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryFileManagementRepository,
      InvoiceRepository,
      DeliveryFileLinkRepository,
    ]),
    ReceiptInformationModule,
    ReceiptDistributionSettingModule,
    DeliveryFileLinkModule,
    InvoiceModule,
    DeliveryFileLinkModule,
  ],
  controllers: [DeliveryFileManagementController],
  providers: [
    DeliveryFileManagementService,
    InvoiceService,
    DeliveryFileLinkService,
  ],
  exports: [DeliveryFileManagementService],
})
export class DeliveryFileManagementModule {}
