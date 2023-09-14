import { Module } from '@nestjs/common';
import { AccountModule } from '../accounts/accounts.module';
import { ReceiptInformationModule } from '../receipt-information/receipt-information.module';
import { RemoteStaffController } from './remote-staff.controller';
import { RemoteStaffService } from './remote-staff.service';

@Module({
  imports: [AccountModule, ReceiptInformationModule],
  controllers: [RemoteStaffController],
  providers: [RemoteStaffService],
})
export class RemoteStaffModule {}
