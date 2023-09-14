import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { AccountInfo } from '../../common/account-info';
import { AccountService } from '../accounts/accounts.service';
import { AccountGroupDto } from '../accounts/dto/account-group.dto';
import {
  DelayedDeliveryFlagEnum,
  InspectionIncompleteFlagEnum,
} from '../receipt-information/enum';
import { ReceiptInformationService } from '../receipt-information/receipt-information.service';
import { SearchRemoteStaffDto } from './dto/search-remote-staff.dto';

@Injectable()
export class RemoteStaffService {
  constructor(
    private accountService: AccountService,
    private receiptService: ReceiptInformationService,
  ) {}

  async search(
    search: SearchRemoteStaffDto,
    authUser: AccountInfo,
  ): Promise<AccountGroupDto[]> {
    const accountGroups = await this.accountService.getAccountGroup(
      authUser.account_id,
    );
    if (accountGroups.length) {
      const mapAccountReceipt = await this.receiptService.findByAccountIdIn(
        accountGroups.map((e) => e.account_id),
        search.start_date,
        search.end_date,
      );
      accountGroups.forEach((accountGroup) => {
        const receipts = mapAccountReceipt.get(accountGroup.account_id) || [];
        accountGroup.total_receipt = receipts.length;
        if (receipts.length) {
          if (search.start_date && search.end_date) {
            const monthStart = dayjs(search.start_date).month();
            const monthEnd = dayjs(search.end_date).month();
            accountGroup.abs_receipt =
              receipts.length / (monthEnd - monthStart + 1);
          }
          accountGroup.abs_receipt_complete_time =
            receipts.reduce(
              (a, { inspection_time }) => a + (inspection_time || 0),
              0,
            ) / receipts.length;
          accountGroup.abs_one_receipt_complete_time =
            accountGroup.abs_receipt_complete_time;
          accountGroup.abd_point_one_receipt =
            receipts.reduce((a, { total_score }) => a + (total_score || 0), 0) /
            receipts.length;
          accountGroup.count_delayed_delivery_ncomplete = receipts.filter(
            (e) => e.delayed_delivery_flag === DelayedDeliveryFlagEnum.DELAY,
          ).length;
          accountGroup.count_inspection_incomplete_ncomplete = receipts.filter(
            (e) =>
              e.inspection_incomplete_flag ===
              InspectionIncompleteFlagEnum.NOT_COMPLETED,
          ).length;
        }
      });
    }
    return accountGroups;
  }
}
