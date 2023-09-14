import { ReceiptInformation } from '../../../modules/receipt-information/entities/receipt-information.entity';

export class DeliverySetting {
  public static builder(receipts: ReceiptInformation[]) {
    return new DeliverySetting.DeliverySettingBuilder(receipts);
  }

  static DeliverySettingBuilder = class {
    _receipts: ReceiptInformation[];

    _is_change: boolean;

    constructor(receipts: ReceiptInformation[]) {
      this._receipts = [...receipts];
      this._is_change = false;
    }

    mi_id(mi_id: number) {
      if (mi_id) {
        this._is_change = true;
        this._receipts = this._receipts.filter((e) => e.mi_id === mi_id);
      }
      return this;
    }

    p_id(p_id: number) {
      if (p_id) {
        this._is_change = true;
        this._receipts = this._receipts.filter((e) => e.p_id === p_id);
      }
      return this;
    }

    medicalAndDental(medical_and_dental: number) {
      if (medical_and_dental) {
        this._is_change = true;
        this._receipts = this._receipts.filter(
          (e) => e.medical_dental_flag === medical_and_dental,
        );
      }
      return this;
    }

    inpatientOutpatient(inpatient_outpatient: number) {
      if (inpatient_outpatient) {
        this._is_change = true;
        this._receipts = this._receipts.filter(
          (e) => e.inpatient_outpatient_flag === inpatient_outpatient,
        );
      }
      return this;
    }

    socialInsuranceNational(social_insurance_national: number) {
      if (social_insurance_national) {
        this._is_change = true;
        this._receipts = this._receipts.filter(
          (e) => e.social_national_flag === social_insurance_national,
        );
      }
      return this;
    }

    clinicalDepartment(clinical_department: number) {
      if (clinical_department) {
        this._is_change = true;
        this._receipts = this._receipts.filter(
          (e) => Number(e.clinical_department) === clinical_department,
        );
      }
      return this;
    }

    errorFlag(error_flag: number) {
      if (error_flag) {
        this._is_change = true;
        this._receipts = this._receipts.filter(
          (e) => e.error_flag === error_flag,
        );
      }
      return this;
    }

    belowScore(below: number) {
      if (below != null && below != undefined) {
        this._is_change = true;
        this._receipts = this._receipts.filter((e) => e.total_score >= below);
      }
      return this;
    }

    moreScore(more: number) {
      if (more != null && more != undefined) {
        this._is_change = true;
        this._receipts = this._receipts.filter((e) => e.total_score <= more);
      }
      return this;
    }

    build() {
      return this._is_change ? this._receipts : [];
    }
  };
}
