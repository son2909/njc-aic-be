import { EntityRepository, Repository } from 'typeorm';
import { Account } from '../accounts/accounts.entity';
import { MedicalDepartment } from '../master/medical-department/medical-department.entity';
import { Order } from './../../enum/order.enum';
import { ReceiptDistributionSetting } from './entities/receipt-distribution-setting.entity';

@EntityRepository(ReceiptDistributionSetting)
export class ReceiptDistributionSettingRepository extends Repository<ReceiptDistributionSetting> {
  async findAllCustom() {
    const qb = this.createQueryBuilder('rdst')
      .select('rdst.setting_id', 'setting_id')
      .addSelect('rdst.p_id', 'p_id')
      .addSelect('rdst.mi_id', 'mi_id')
      .addSelect('rdst.p_id', 'patient_id')
      .addSelect('rdst.medical_and_dental', 'medical_and_dental')
      .addSelect('rdst.inpatient_outpatient', 'inpatient_outpatient')
      .addSelect('rdst.account_id', 'account_id')
      .addSelect(
        'rdst.social_insurance_national_insurance',
        'social_insurance_national_insurance',
      )
      .addSelect('rdst.date_of_medical_treatment', 'date_of_medical_treatment')
      .addSelect('rdst.clinical_department', 'clinical_department')
      .addSelect(
        'rdst.presence_or_absence_of_errors',
        'presence_or_absence_of_errors',
      )
      .addSelect(
        'rdst.more_than_the_corresponding_score_flag',
        'more_than_the_corresponding_score_flag',
      )
      .addSelect('rdst.flag_below_the_score', 'flag_below_the_score')
      .addSelect('rdst.created_date', 'created_date')
      .addSelect('rdst.update_date', 'update_date')
      .leftJoin(Account, 'amt', 'amt.account_id = rdst.account_id')
      .addSelect('amt.nickname', 'account_username')
      .leftJoin(MedicalDepartment, 'mdm', 'mdm.code = rdst.clinical_department')
      .addSelect('mdm.content', 'clinical_department_name')
      .orderBy({
        'rdst.created_date': Order.DESC,
      });
    return qb.getRawMany();
  }
}
