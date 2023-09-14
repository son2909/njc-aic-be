import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountInfo } from '../../common/account-info';
import { ApiError } from '../../filter/api.error';
import { ImportResultDto } from '../../media-storage/dto/import-result.dto';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { ImportBaseService } from '../../utils/import-base.service';
import { FileDivisionEnum } from '../file-management/enum/file-division.enum';
import { FileManagementService } from '../file-management/file-management.service';
import { AbolishedMedicalPracticeM } from './abolished-medical-practice/abolished-medical-practice.entity';
import { AbolishedMedicalPracticeMService } from './abolished-medical-practice/abolished-medical-practice.service';
import { AuxiliaryService } from './auxiliary/auxiliary.service';
import { Auxiliary } from './auxiliary/entities/auxiliary.entity';
import { CommentM } from './comment/comment.entity';
import { CommentMService } from './comment/comment.service';
import { ConflictRelatedService } from './conflict-related/conflict-related.service';
import { ConflictRelated } from './conflict-related/entities/conflict-related.entity';
import { DiscontinuedDrugM } from './discontinued-drug/discontinued-drug.entity';
import { DiscontinuedDrugMService } from './discontinued-drug/discontinued-drug.service';
import { DispensingActService } from './dispensing-act/dispensing-act.service';
import { DispensingAct } from './dispensing-act/entities/dispensing-act.entity';
import { DoctorService } from './doctor/doctor.service';
import { Doctor } from './doctor/entities/doctor.entity';
import { DrugsPresenceAbsenceService } from './drugs-presence-absence/drugs-presence-absence.service';
import { DrugsPresenceAbsence } from './drugs-presence-absence/entities/drugs-presence-absence.entity';
import { MasterTable } from './dto/enum/master-table.enum';
import { SearchMasterResponseDto } from './dto/response/search-master-response.dto';
import { FacilityStandardMedical } from './facility-standard/entities/facility-standard-medical.entity';
import { FacilityStandardWelfare } from './facility-standard/entities/facility-standard-welfare.entity';
import { FacilityStandardMedicalService } from './facility-standard/facility-standard-medical.service';
import { FacilityStandardWelfareService } from './facility-standard/facility-standard-welfare.service';
import { GeneralDrugName } from './general-drug-name/entities/general-drug-name.entity';
import { GeneralDrugNameService } from './general-drug-name/general-drug-name.service';
import { HighRiskDrug } from './high-risk-drug/entities/high-risk-drug.entity';
import { HighRiskDrugService } from './high-risk-drug/high-risk-drug.service';
import { HospitalBasicChargeT } from './hospital-basic-charge/hospital-basic-charge.entity';
import { HospitalBasicChargeTService } from './hospital-basic-charge/hospital-basic-charge.service';
import { Inclusive } from './inclusive/entities/inclusive.entity';
import { InclusiveService } from './inclusive/inclusive.service';
import { InjuryName } from './injury-name/entities/injury-name.entity';
import { InjuryNameService } from './injury-name/injury-name.service';
import { IssuingQueryManagementService } from './issuing-query-management/issuing_query_management.service';
import { MedicalDepartment } from './medical-department/medical-department.entity';
import { MedicalDepartmentService } from './medical-department/medical-department.service';
import { MedicalPractice } from './medical-practice/entities/medical-practice.entity';
import { MedicalPracticeService } from './medical-practice/medical-practice.service';
import { MessageService } from './message/message.service';
import { Modifier } from './modifier/entities/modifier.entity';
import { ModifierService } from './modifier/modifier.service';
import { NumberOfCalculationsT } from './number-of-calculations/number-of-calculations.entity';
import { NumberOfCalculationsTService } from './number-of-calculations/number-of-calculations.service';
import { PaymentFundMedicalDepartment } from './payment-fund-medical-department/payment-fund-medical-department.entity';
import { PaymentFundMedicalDepartmentService } from './payment-fund-medical-department/payment-fund-medical-department.service';
import { PharmaceuticalM } from './pharmaceutical/pharmaceutical.entity';
import { PharmaceuticalMService } from './pharmaceutical/pharmaceutical.service';
import { SpecificEquipmentM } from './specific-equipment/specific-equipment.entity';
import { SpecificEquipmentMService } from './specific-equipment/specific-equipment.service';
import { Ward } from './ward/ward.entity';
import { WardService } from './ward/ward.service';
import moment from 'moment';
import { AppraisalInformationService } from '../appraisal-information/appraisal-information.service';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { PageDto } from '../../common/dto/pagination.dto';
import { PageMetaDto } from '../../common/dto/pagination-meta.dto';

@Injectable()
export class MasterImportService extends ImportBaseService {
  constructor(
    private fileManagementService: FileManagementService,
    private mediaStorageService: MediaStorageService,
    private doctorService: DoctorService,
    private highRiskDrugService: HighRiskDrugService,
    private generalDrugNameService: GeneralDrugNameService,
    private inclusiveService: InclusiveService,
    private hospitalBasicChargeTService: HospitalBasicChargeTService,
    private numberOfCalculationsTService: NumberOfCalculationsTService,
    private discontinuedDrugMService: DiscontinuedDrugMService,
    private auxiliaryService: AuxiliaryService,
    private medicalDepartmentService: MedicalDepartmentService,
    private wardService: WardService,
    private commentMService: CommentMService,
    private abolishedMedicalPracticeMService: AbolishedMedicalPracticeMService,
    private conflictRelatedService: ConflictRelatedService,
    private facilityStandarMedicalService: FacilityStandardMedicalService,
    private facilityStandarWelfareService: FacilityStandardWelfareService,
    private specificEquipmentMService: SpecificEquipmentMService,
    private pharmaceuticalMService: PharmaceuticalMService,
    private dispensingActService: DispensingActService,
    private paymentFundMedicalDepartmentService: PaymentFundMedicalDepartmentService,
    private modifierService: ModifierService,
    private drugsPresenceAbsenceService: DrugsPresenceAbsenceService,
    private injuryNameService: InjuryNameService,
    private medicalPracticeService: MedicalPracticeService,
    private appraisalInformationService: AppraisalInformationService,
    private messageService: MessageService,
    private issuingQueryManagementService: IssuingQueryManagementService,
  ) {
    super();
  }

  private searchMasterCase: object = {
    MEDICAL_PRACTICE_M: async (keyword, pageOptionsDto) =>
      await this.medicalPracticeService.searchMaster(
        pageOptionsDto,
        MasterTable.MEDICAL_PRACTICE_M,
        keyword,
        'medical_practice_code',
        'kanji_name_1',
        ['kanji_name_2'],
      ),
    PHARMACEUTICAL_M: async (keyword, pageOptionsDto) =>
      await this.pharmaceuticalMService.searchMaster(
        pageOptionsDto,
        MasterTable.PHARMACEUTICAL_M,
        keyword,
        'drug_code',
        'kanji_name_1',
        ['kanji_name_2', 'kana_name'],
      ),
    SPECIFIC_EQUIPMENT_M: async (keyword, pageOptionsDto) =>
      await this.specificEquipmentMService.searchMaster(
        pageOptionsDto,
        MasterTable.SPECIFIC_EQUIPMENT_M,
        keyword,
        'specified_equipment_code',
        'basic_kanji_name',
        ['kanji_name_1', 'kanji_name_2', 'kana_name'],
      ),
    COMMENT_M: async (keyword, pageOptionsDto) =>
      await this.commentMService.searchMaster(
        pageOptionsDto,
        MasterTable.COMMENT_M,
        keyword,
        'master_type',
        'kanji_name',
        ['kana_name'],
      ),
    DISPENSING_ACT_M: async (keyword, pageOptionsDto) =>
      await this.dispensingActService.searchMaster(
        pageOptionsDto,
        MasterTable.DISPENSING_ACT_M,
        keyword,
        'dispensing_code',
        'kanji_name',
        ['kana_name'],
      ),
    ABOLISHED_MEDICAL_PRACTICE_M: async (keyword, pageOptionsDto) =>
      await this.abolishedMedicalPracticeMService.searchMaster(
        pageOptionsDto,
        MasterTable.ABOLISHED_MEDICAL_PRACTICE_M,
        keyword,
        'medical_practice_code',
        'abbreviated_kanji_name',
        [],
      ),
    DISCONTINUED_DRUG_M: async (keyword, pageOptionsDto) =>
      await this.discontinuedDrugMService.searchMaster(
        pageOptionsDto,
        MasterTable.DISCONTINUED_DRUG_M,
        keyword,
        'drug_code',
        'kanji_name',
        [],
      ),
    HIGH_RISK_DRUG_M: async (keyword, pageOptionsDto) =>
      await this.highRiskDrugService.searchMaster(
        pageOptionsDto,
        MasterTable.HIGH_RISK_DRUG_M,
        keyword,
        'drug_code',
        'kanji_name',
        ['kana_name'],
      ),
    GENERAL_DRUG_NAME_M: async (keyword, pageOptionsDto) =>
      await this.generalDrugNameService.searchMaster(
        pageOptionsDto,
        MasterTable.GENERAL_DRUG_NAME_M,
        keyword,
        'common_name_code',
        'generic_name_prescription',
        [],
      ),
    PRESENCE_ABSENCE_GENERIC_DRUGS_M: async (keyword, pageOptionsDto) =>
      await this.drugsPresenceAbsenceService.searchMaster(
        pageOptionsDto,
        MasterTable.PRESENCE_ABSENCE_GENERIC_DRUGS_M,
        keyword,
        'drug_code',
        'product_name',
        [],
        'record_creation_date',
      ),
    PAYMENT_FUND_MEDICAL_DEPARTMENT_M: async (keyword, pageOptionsDto) =>
      await this.paymentFundMedicalDepartmentService.searchMaster(
        pageOptionsDto,
        MasterTable.PAYMENT_FUND_MEDICAL_DEPARTMENT_M,
        keyword,
        'code',
        'content',
        [],
      ),
    AUXILIARY_T: async (keyword, pageOptionsDto) =>
      await this.auxiliaryService.searchMaster(
        pageOptionsDto,
        MasterTable.AUXILIARY_T,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    INCLUSIVE_T: async (keyword, pageOptionsDto) =>
      await this.inclusiveService.searchMaster(
        pageOptionsDto,
        MasterTable.INCLUSIVE,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    CONFLICT_RELATED_T: async (keyword, pageOptionsDto) =>
      await this.conflictRelatedService.searchMaster(
        pageOptionsDto,
        MasterTable.CONFLICT_RELATED_T,
        keyword,
        'medical_practice_code_1',
        'abbreviated_name_1',
        [],
      ),
    HOSPITAL_BASIC_CHARGE_T: async (keyword, pageOptionsDto) =>
      await this.hospitalBasicChargeTService.searchMaster(
        pageOptionsDto,
        MasterTable.HOSPITAL_BASIC_CHARGE_T,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    NUMBER_OF_CALCULATIONS_T: async (keyword, pageOptionsDto) =>
      await this.numberOfCalculationsTService.searchMaster(
        pageOptionsDto,
        MasterTable.NUMBER_OF_CALCULATIONS_T,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    WARD_M: async (keyword, pageOptionsDto) =>
      await this.wardService.searchMaster(
        pageOptionsDto,
        MasterTable.WARD_M,
        keyword,
        'code',
        'content',
        [],
      ),
    FACILITY_STANDARD_M_1: async (keyword, pageOptionsDto) =>
      await this.facilityStandarWelfareService.searchMaster(
        pageOptionsDto,
        MasterTable.FACILITY_STANDARD_M_1,
        keyword,
        'facility_standard_code',
        'facility_standard_name',
        [],
      ),
    FACILITY_STANDARD_M_2: async (keyword, pageOptionsDto) =>
      await this.facilityStandarMedicalService.searchMaster(
        pageOptionsDto,
        MasterTable.SPECIFIC_EQUIPMENT_M,
        keyword,
        'facility_standard_code',
        'facility_standard_name',
        [],
      ),
    INJURY_NAME_M: async (keyword, pageOptionsDto) =>
      await this.injuryNameService.searchMaster(
        pageOptionsDto,
        MasterTable.INJURY_NAME_M,
        keyword,
        'injury_name_code',
        'basic_name',
        ['kana_name'],
      ),
    MODIFIER: async (keyword, pageOptionsDto) =>
      await this.modifierService.searchMaster(
        pageOptionsDto,
        MasterTable.MODIFIER,
        keyword,
        'code',
        'name',
        ['kana_name'],
      ),
    APPRAISAL_INFORMATION_T: async (keyword, pageOptionsDto) =>
      await this.appraisalInformationService.searchMaster(
        pageOptionsDto,
        MasterTable.APPRAISAL_INFORMATION_T,
        keyword,
        'f_id',
        'date_of_medical_treatment',
        [],
      ),
    MESSAGE_T: async (keyword, pageOptionsDto) =>
      await this.messageService.searchMaster(
        pageOptionsDto,
        MasterTable.MESSAGE_T,
        keyword,
        'message_id',
        'converted_content',
        [],
        'message_id',
      ),
    ISSUING_QUERY_MANAGEMENT_T: async (keyword, pageOptionsDto) =>
      await this.issuingQueryManagementService.searchMaster(
        pageOptionsDto,
        MasterTable.SPECIFIC_EQUIPMENT_M,
        keyword,
        'query_id',
        'query_content',
        [],
        'query_di',
      ),
  };

  private searchExportCase: object = {
    MEDICAL_PRACTICE_M: async (keyword) =>
      await this.medicalPracticeService.searchExportMaster(
        MasterTable.MEDICAL_PRACTICE_M,
        keyword,
        'medical_practice_code',
        'kanji_name_1',
        ['kanji_name_2'],
      ),
    PHARMACEUTICAL_M: async (keyword) =>
      await this.pharmaceuticalMService.searchExportMaster(
        MasterTable.PHARMACEUTICAL_M,
        keyword,
        'drug_code',
        'kanji_name_1',
        ['kanji_name_2', 'kana_name'],
      ),
    SPECIFIC_EQUIPMENT_M: async (keyword) =>
      await this.specificEquipmentMService.searchExportMaster(
        MasterTable.SPECIFIC_EQUIPMENT_M,
        keyword,
        'specified_equipment_code',
        'basic_kanji_name',
        ['kanji_name_1', 'kanji_name_2', 'kana_name'],
      ),
    COMMENT_M: async (keyword) =>
      await this.commentMService.searchExportMaster(
        MasterTable.COMMENT_M,
        keyword,
        'master_type',
        'kanji_name',
        ['kana_name'],
      ),
    DISPENSING_ACT_M: async (keyword) =>
      await this.dispensingActService.searchExportMaster(
        MasterTable.DISPENSING_ACT_M,
        keyword,
        'dispensing_code',
        'kanji_name',
        ['kana_name'],
      ),
    ABOLISHED_MEDICAL_PRACTICE_M: async (keyword) =>
      await this.abolishedMedicalPracticeMService.searchExportMaster(
        MasterTable.ABOLISHED_MEDICAL_PRACTICE_M,
        keyword,
        'medical_practice_code',
        'abbreviated_kanji_name',
        [],
      ),
    DISCONTINUED_DRUG_M: async (keyword) =>
      await this.discontinuedDrugMService.searchExportMaster(
        MasterTable.DISCONTINUED_DRUG_M,
        keyword,
        'drug_code',
        'kanji_name',
        [],
      ),
    HIGH_RISK_DRUG_M: async (keyword) =>
      await this.highRiskDrugService.searchExportMaster(
        MasterTable.HIGH_RISK_DRUG_M,
        keyword,
        'drug_code',
        'kanji_name',
        ['kana_name'],
      ),
    GENERAL_DRUG_NAME_M: async (keyword) =>
      await this.generalDrugNameService.searchExportMaster(
        MasterTable.GENERAL_DRUG_NAME_M,
        keyword,
        'common_name_code',
        'generic_name_prescription',
        [],
      ),
    PRESENCE_ABSENCE_GENERIC_DRUGS_M: async (keyword) =>
      await this.drugsPresenceAbsenceService.searchExportMaster(
        MasterTable.PRESENCE_ABSENCE_GENERIC_DRUGS_M,
        keyword,
        'drug_code',
        'product_name',
        [],
        'record_creation_date',
      ),
    PAYMENT_FUND_MEDICAL_DEPARTMENT_M: async (keyword) =>
      await this.paymentFundMedicalDepartmentService.searchExportMaster(
        MasterTable.PAYMENT_FUND_MEDICAL_DEPARTMENT_M,
        keyword,
        'code',
        'content',
        [],
      ),
    AUXILIARY_T: async (keyword) =>
      await this.auxiliaryService.searchExportMaster(
        MasterTable.AUXILIARY_T,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    INCLUSIVE_T: async (keyword) =>
      await this.inclusiveService.searchExportMaster(
        MasterTable.INCLUSIVE,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    CONFLICT_RELATED_T: async (keyword) =>
      await this.conflictRelatedService.searchExportMaster(
        MasterTable.CONFLICT_RELATED_T,
        keyword,
        'medical_practice_code_1',
        'abbreviated_name_1',
        [],
      ),
    HOSPITAL_BASIC_CHARGE_T: async (keyword) =>
      await this.hospitalBasicChargeTService.searchExportMaster(
        MasterTable.HOSPITAL_BASIC_CHARGE_T,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    NUMBER_OF_CALCULATIONS_T: async (keyword) =>
      await this.numberOfCalculationsTService.searchExportMaster(
        MasterTable.NUMBER_OF_CALCULATIONS_T,
        keyword,
        'medical_practice_code',
        'abbreviated_name',
        [],
      ),
    WARD_M: async (keyword) =>
      await this.wardService.searchExportMaster(
        MasterTable.WARD_M,
        keyword,
        'code',
        'content',
        [],
      ),
    FACILITY_STANDARD_M_1: async (keyword) =>
      await this.facilityStandarWelfareService.searchExportMaster(
        MasterTable.FACILITY_STANDARD_M_1,
        keyword,
        'facility_standard_code',
        'facility_standard_name',
        [],
      ),
    FACILITY_STANDARD_M_2: async (keyword) =>
      await this.facilityStandarMedicalService.searchExportMaster(
        MasterTable.SPECIFIC_EQUIPMENT_M,
        keyword,
        'facility_standard_code',
        'facility_standard_name',
        [],
      ),
    INJURY_NAME_M: async (keyword) =>
      await this.injuryNameService.searchExportMaster(
        MasterTable.INJURY_NAME_M,
        keyword,
        'injury_name_code',
        'basic_name',
        ['kana_name'],
      ),
    MODIFIER: async (keyword) =>
      await this.modifierService.searchExportMaster(
        MasterTable.MODIFIER,
        keyword,
        'code',
        'name',
        ['kana_name'],
      ),
    APPRAISAL_INFORMATION_T: async (keyword) =>
      await this.appraisalInformationService.searchExportMaster(
        MasterTable.APPRAISAL_INFORMATION_T,
        keyword,
        'f_id',
        'date_of_medical_treatment',
        [],
      ),
    MESSAGE_T: async (keyword) =>
      await this.messageService.searchExportMaster(
        MasterTable.MESSAGE_T,
        keyword,
        'message_id',
        'converted_content',
        [],
        'message_id',
      ),
    ISSUING_QUERY_MANAGEMENT_T: async (keyword) =>
      await this.issuingQueryManagementService.searchExportMaster(
        MasterTable.SPECIFIC_EQUIPMENT_M,
        keyword,
        'query_id',
        'query_content',
        [],
        'query_di',
      ),
  };

  private detailMasterCase: object = {
    MEDICAL_PRACTICE_M: async (id) =>
      await this.medicalPracticeService.findByIdMaster(id),
    PHARMACEUTICAL_M: async (id) =>
      await this.pharmaceuticalMService.findByIdMaster(id),
    SPECIFIC_EQUIPMENT_M: async (id) =>
      await this.specificEquipmentMService.findByIdMaster(id),
    COMMENT_M: async (id) => await this.commentMService.findByIdMaster(id),
    DISPENSING_ACT_M: async (id) =>
      await this.dispensingActService.findByIdMaster(id),
    ABOLISHED_MEDICAL_PRACTICE_M: async (id) =>
      await this.abolishedMedicalPracticeMService.findByIdMaster(id),
    DISCONTINUED_DRUG_M: async (id) =>
      await this.discontinuedDrugMService.findByIdMaster(id),
    HIGH_RISK_DRUG_M: async (id) =>
      await this.highRiskDrugService.findByIdMaster(id),
    GENERAL_DRUG_NAME_M: async (id) =>
      await this.generalDrugNameService.findByIdMaster(id),
    PRESENCE_ABSENCE_GENERIC_DRUGS_M: async (id) =>
      await this.drugsPresenceAbsenceService.findByIdMaster(id),
    PAYMENT_FUND_MEDICAL_DEPARTMENT_M: async (id) =>
      await this.paymentFundMedicalDepartmentService.findByIdMaster(id),
    AUXILIARY_T: async (id) => await this.auxiliaryService.findByIdMaster(id),
    INCLUSIVE_T: async (id) => await this.inclusiveService.findByIdMaster(id),
    CONFLICT_RELATED_T: async (id) =>
      await this.conflictRelatedService.findByIdMaster(id),
    HOSPITAL_BASIC_CHARGE_T: async (id) =>
      await this.hospitalBasicChargeTService.findByIdMaster(id),
    NUMBER_OF_CALCULATIONS_T: async (id) =>
      await this.numberOfCalculationsTService.findByIdMaster(id),
    WARD_M: async (id) => await this.wardService.findByIdMaster(id),
    FACILITY_STANDARD_M_1: async (id) =>
      await this.facilityStandarWelfareService.findByIdMaster(id),
    FACILITY_STANDARD_M_2: async (id) =>
      await this.facilityStandarMedicalService.findByIdMaster(id),
    INJURY_NAME_M: async (id) =>
      await this.injuryNameService.findByIdMaster(id),
    MODIFIER: async (id) => await this.modifierService.findByIdMaster(id),
    APPRAISAL_INFORMATION_T: async (id) =>
      await this.appraisalInformationService.findByIdMaster(id),
    MESSAGE_T: async (id) =>
      await this.messageService.findByIdMaster(id, 'message_id'),
    ISSUING_QUERY_MANAGEMENT_T: async (id) =>
      await this.issuingQueryManagementService.findByIdMaster(id, 'query_id'),
  };

  private updateMasterCase: object = {
    MEDICAL_PRACTICE_M: async (id, data) =>
      await this.medicalPracticeService.updateMaster(id, data, [
        'medical_practice_code',
      ]),
    PHARMACEUTICAL_M: async (id, data) =>
      await this.pharmaceuticalMService.updateMaster(id, data, ['drug_code']),
    SPECIFIC_EQUIPMENT_M: async (id, data) =>
      await this.specificEquipmentMService.updateMaster(id, data, [
        'specified_equipment_code',
      ]),
    COMMENT_M: async (id, data) =>
      await this.commentMService.updateMaster(id, data, ['number']),
    DISPENSING_ACT_M: async (id, data) =>
      await this.dispensingActService.updateMaster(id, data, [
        'dispensing_code',
      ]),
    ABOLISHED_MEDICAL_PRACTICE_M: async (id, data) =>
      await this.abolishedMedicalPracticeMService.updateMaster(id, data, [
        'medical_practice_code',
      ]),
    DISCONTINUED_DRUG_M: async (id, data) =>
      await this.discontinuedDrugMService.updateMaster(id, data, ['drug_code']),
    HIGH_RISK_DRUG_M: async (id, data) =>
      await this.highRiskDrugService.updateMaster(id, data, ['drug_code']),
    GENERAL_DRUG_NAME_M: async (id, data) =>
      await this.generalDrugNameService.updateMaster(id, data, [
        'common_name_code',
      ]),
    PRESENCE_ABSENCE_GENERIC_DRUGS_M: async (id, data) =>
      await this.drugsPresenceAbsenceService.updateMaster(id, data, [
        'drug_code',
      ]),
    PAYMENT_FUND_MEDICAL_DEPARTMENT_M: async (id, data) =>
      await this.paymentFundMedicalDepartmentService.updateMaster(id, data, [
        'code',
      ]),
    AUXILIARY_T: async (id, data) =>
      await this.auxiliaryService.updateMaster(id, data, [
        'medical_practice_code',
      ]),
    INCLUSIVE_T: async (id, data) =>
      await this.inclusiveService.updateMaster(id, data, [
        'medical_practice_code',
      ]),
    CONFLICT_RELATED_T: async (id, data) =>
      await this.conflictRelatedService.updateMaster(id, data, [
        'medical_practice_code_1',
      ]),
    HOSPITAL_BASIC_CHARGE_T: async (id, data) =>
      await this.hospitalBasicChargeTService.updateMaster(id, data, [
        'medical_practice_code',
      ]),
    NUMBER_OF_CALCULATIONS_T: async (id, data) =>
      await this.numberOfCalculationsTService.updateMaster(id, data, [
        'medical_practice_code',
      ]),
    WARD_M: async (id, data) =>
      await this.wardService.updateMaster(id, data, ['code']),
    FACILITY_STANDARD_M_1: async (id, data) =>
      await this.facilityStandarWelfareService.updateMaster(id, data, [
        'facility_standard_code',
      ]),
    FACILITY_STANDARD_M_2: async (id, data) =>
      await this.facilityStandarMedicalService.updateMaster(id, data, [
        'facility_standard_code',
      ]),
    INJURY_NAME_M: async (id, data) =>
      await this.injuryNameService.updateMaster(id, data, ['injury_name_code']),
    MODIFIER: async (id, data) =>
      await this.modifierService.updateMaster(id, data, ['code']),
    APPRAISAL_INFORMATION_T: async (id, data) =>
      await this.appraisalInformationService.updateMaster(id, data, ['f_id']),
    MESSAGE_T: async (id, data) =>
      await this.messageService.updateMaster(id, data, []),
    ISSUING_QUERY_MANAGEMENT_T: async (id, data) =>
      await this.issuingQueryManagementService.updateMaster(id, data, []),
  };

  // presence_absence_generic_drugs_m.csv
  async importDrugPresenceAbsenceMaster(
    fileKey: string,
    authUser?: AccountInfo,
  ) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const drugsPresenceAbsenceData = await this.getDataSuccess(
      data,
      DrugsPresenceAbsence,
    );
    await this.drugsPresenceAbsenceService.bulkInsert(
      drugsPresenceAbsenceData,
      'drug_code',
      [
        'ingredient_name',
        'product_name',
        'information_of_generic_drugs',
        'listing_date',
        'expire_date_transitional',
        'remarks',
        'items_excluded_calculation',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(
      fileKey,
      data.length,
      drugsPresenceAbsenceData.length,
    );
  }

  // hospital_basic_charge_T.csv
  async importHospitalBasicCharge(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const hospitalBasicChargeData = await this.getDataSuccess(
      data,
      HospitalBasicChargeT,
    );
    await this.hospitalBasicChargeTService.bulkInsert(
      hospitalBasicChargeData,
      ['medical_practice_code', 'group_number'],
      [
        'change_category',
        'abbreviated_name',
        'addition_identification',
        'spare',
        'established_date',
        'abolition_date',
        'update_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, hospitalBasicChargeData.length);
  }

  // number_of_calculations_T.csv
  async importNumberOfCalculation(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const numberOfCalculationsTData = await this.getDataSuccess(
      data,
      NumberOfCalculationsT,
    );
    await this.numberOfCalculationsTService.bulkInsert(
      numberOfCalculationsTData,
      ['medical_practice_code', 'unit_of_measure_code'],
      [
        'change_category',
        'abbreviated_name',
        'accounting_unit_name',
        'number_of_calculations',
        'special_conditions',
        'spare_1',
        'spare_2',
        'spare_3',
        'spare_4',
        'spare_5',
        'established_date',
        'abolition_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(
      fileKey,
      data.length,
      numberOfCalculationsTData.length,
    );
  }

  // high-risk_drug_m.csv
  async importHighRiskDrugMaster(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    const highRiskDrugs = await this.getDataSuccess(data, HighRiskDrug);
    await this.highRiskDrugService.bulkInsert(
      highRiskDrugs,
      ['drug_code'],
      [
        'kanji_name',
        'kana_name',
        'dosage_form',
        'drug_price_standard_code',
        'basic_kanji_name',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, highRiskDrugs.length);
  }

  // doctor_m.csv
  async importDoctorMaster(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey, 'utf-8');
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const doctorData = await this.getDataSuccess(data, Doctor);
    await this.doctorService.bulkInsert(
      doctorData,
      ['doctor_id'],
      ['doctor_name', 'mi_id'],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, doctorData.length);
  }

  // general_drug_name_m.csv
  async importGeneralDrugNameMaster(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const generalDrugNames = await this.getDataSuccess(data, GeneralDrugName);
    await this.generalDrugNameService.bulkInsert(
      generalDrugNames,
      'common_name_code',
      [
        'division',
        'generic_name_prescription',
        'ingredient_name',
        'standard',
        'addition_target',
        'exception_code',
        'lowest_drug_price',
        'remarks',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, generalDrugNames.length);
  }

  // inclusive_t.csv
  async importInclusive(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const inclusiveData = await this.getDataSuccess(data, Inclusive);
    await this.inclusiveService.bulkInsert(
      inclusiveData,
      'medical_practice_code',
      [
        'change_category',
        'group_number',
        'abbreviated_name',
        'special_conditions',
        'established_date',
        'abolition_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, inclusiveData.length);
  }

  // Discontinued_drug_M.csv
  async importDiscontinuedDrugM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const discontinuedDrugMData = await this.getDataSuccess(
      data,
      DiscontinuedDrugM,
    );
    await this.discontinuedDrugMService.bulkInsert(
      discontinuedDrugMData,
      'drug_code',
      [
        'dosage_form',
        'kanji_name',
        'amount_type',
        'amount_of_money',
        'abolition_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, discontinuedDrugMData.length);
  }

  // auxiliary_t.csv
  async importAuxiliary(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const auxiliaryData = await this.getDataSuccess(data, Auxiliary);
    if (auxiliaryData.length) {
      const colOveride = [...Object.keys(auxiliaryData[0])]
        .filter((e) => 'medical_practice_code' !== e && 'created_date' !== e)
        .map((e) => {
          if (e === '_1_day') return '1_day';
          if (e === '_1_week') return '1_week';
          return e;
        });
      await this.auxiliaryService.bulkInsert(
        auxiliaryData,
        'medical_practice_code',
        colOveride,
      );
    }
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, auxiliaryData.length);
  }

  // medical_department_m.csv
  async importMedicalDepartmentM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey, 'utf-8');
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const medicalDepartmentData = await this.getDataSuccess(
      data,
      MedicalDepartment,
    );
    await this.medicalDepartmentService.bulkInsert(
      medicalDepartmentData,
      'code',
      ['content', 'update_date'],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, medicalDepartmentData.length);
  }

  // ward_m.csv
  async importWardM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey, 'utf-8');
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const wardData = await this.getDataSuccess(data, Ward);
    await this.wardService.bulkInsert(wardData, 'ward_code', [
      'ward_name',
      'update_date',
    ]);
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, wardData.length);
  }

  // comment_m.csv
  async importCommentM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const commentMData = await this.getDataSuccess(data, CommentM);
    await this.commentMService.bulkInsert(commentMData, 'number', [
      'change_category',
      'master_type',
      'division',
      'pattern',
      'kanji_significant_digits',
      'kanji_name',
      'number_of_significant_digits',
      'kana_name',
      'column_position_1',
      'number_of_digits_1',
      'column_position_2',
      'number_of_digits_2',
      'column_position_3',
      'number_of_digits_3',
      'column_position_4',
      'number_of_digits_4',
      'kanji_name_change_category',
      'kana_name_change_category',
    ]);
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, commentMData.length);
  }

  // abolished_medical_practice_m.csv
  async importAbolishMedicalPractice(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const abolishedMedicalPracticeMData = await this.getDataSuccess(
      data,
      AbolishedMedicalPracticeM,
    );
    await this.abolishedMedicalPracticeMService.bulkInsert(
      abolishedMedicalPracticeMData,
      'medical_practice_code',
      [
        'division',
        'abbreviated_kanji_name',
        'score_identification',
        'points',
        'abolition_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(
      fileKey,
      data.length,
      abolishedMedicalPracticeMData.length,
    );
  }

  // conflict-related_T_1.csv
  async importConflictRelated(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const conflictRelatedData = await this.getDataSuccess(
      data,
      ConflictRelated,
    );
    if (conflictRelatedData.length) {
      const colOveride = [...Object.keys(conflictRelatedData[0])].filter(
        (e) =>
          'medical_practice_code_1' !== e && 'created_date' !== e && 'id' !== e,
      );
      await this.conflictRelatedService.bulkInsert(
        conflictRelatedData,
        'medical_practice_code_1',
        colOveride,
      );
    }
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, conflictRelatedData.length);
  }

  // facility_standard_m_2.csv
  async importFacilityStandardMedical(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const fsMedicals = await this.getDataSuccess(data, FacilityStandardMedical);
    await this.facilityStandarMedicalService.bulkInsertMedical(
      fsMedicals,
      'facility_standard_code',
      ['acquired', 'revision_year'],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, fsMedicals.length);
  }

  // facility_standard_m_1.csv
  async importFacilityStandardWelfare(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const fsWelfares = await this.getDataSuccess(data, FacilityStandardWelfare);
    await this.facilityStandarWelfareService.bulkInsertWelfare(
      fsWelfares,
      'facility_standard_code',
      [
        'facility_standard_name',
        'facility_standard_abbreviation',
        'compatible_receipt_computer_code',
        'revision_year',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, fsWelfares.length);
  }

  // Specific_equipment_M.csv
  async importSpecificEquipment(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const specificEquipmentMData = await this.getDataSuccess(
      data,
      SpecificEquipmentM,
    );
    await this.specificEquipmentMService.bulkInsert(
      specificEquipmentMData,
      'specified_equipment_code',
      [
        'change_category',
        'master_type',
        'kanji_significant_digits_1',
        'kanji_name_1',
        'number_of_significant_digits',
        'kana_name',
        'code',
        'kanji_significant_digits_2',
        'kanji_name_2',
        'amount_type_1',
        'cash_amount',
        'name_use_identification',
        'age_addition_category',
        'minimum_age',
        'upper_age_limit',
        'amount_type_2',
        'old_amount',
        'kanji_name_change_category',
        'kana_name_change_category',
        'classification_such_as_oxygen',
        'specified_equipment_type',
        'maximum_price',
        'maximum_number_of_points',
        'spare_1',
        'publication_sequence_number',
        'abolition',
        'date_of_change',
        'date_of_transitional_measure',
        'abolition_date',
        'attached_table_number',
        'division_number',
        'dpc_application_category',
        'spare_2',
        'reserve_3',
        'spare_4',
        'basic_kanji_name',
        'update_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, specificEquipmentMData.length);
  }

  // Pharmaceutical_M.csv
  async importPharmaceuticalM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const pharmaceuticalMData = await this.getDataSuccess(
      data,
      PharmaceuticalM,
    );
    await this.pharmaceuticalMService.bulkInsert(
      pharmaceuticalMData,
      'drug_code',
      [
        'change_category',
        'master_type',
        'kanji_digit_number_1',
        'kanji_name_1',
        'number_of_kana_digits',
        'kana_name',
        'code',
        'kanji_digit_number_2',
        'kanji_name_2',
        'amount_type',
        'new_cash_amount',
        'spare_1',
        'medicine',
        'neuroleptics',
        'biologics',
        'generic',
        'spare_2',
        'dental_specific_drug',
        'contrast_aid',
        'injection_volume',
        'identification_of_listing_method',
        'related_to_product_names',
        'old_amount_type',
        'old_amount',
        'kanji_change_category',
        'kana_change_category',
        'dosage_form',
        'reserve_3',
        'date_of_change',
        'abolition_date',
        'drug_price_standard_code',
        'publication_sequence_number',
        'date_of_transitional_measure',
        'basic_kanji_name',
        'update_date',
      ],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, pharmaceuticalMData.length);
  }

  // dispensing_act_m.csv
  async importDispensingAct(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const dispensingActData = await this.getDataSuccess(data, DispensingAct);
    if (dispensingActData.length) {
      const colOveride = [...Object.keys(dispensingActData[0])].filter(
        (e) => 'dispensing_code' !== e && 'created_date' !== e && 'id' !== e,
      );
      await this.dispensingActService.bulkInsert(
        dispensingActData,
        'dispensing_code',
        colOveride,
      );
    }
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, dispensingActData.length);
  }

  // Payment_Fund_Medical_Department_M.csv
  async importPaymentFundMedicalDepartmentM(
    fileKey: string,
    authUser?: AccountInfo,
  ) {
    const data = await this.mediaStorageService.csvToData(fileKey, 'utf-8');
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const paymentFundMedicalDepartmentData = await this.getDataSuccess(
      data,
      PaymentFundMedicalDepartment,
    );
    await this.paymentFundMedicalDepartmentService.bulkInsert(
      paymentFundMedicalDepartmentData,
      'code',
      ['content', 'update_date'],
    );
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(
      fileKey,
      data.length,
      paymentFundMedicalDepartmentData.length,
    );
  }

  // modifier_m.csv
  async importModifierM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const modifierData = await this.getDataSuccess(data, Modifier);
    if (modifierData.length) {
      const colOveride = [...Object.keys(modifierData[0])].filter(
        (e) => 'code' !== e && 'created_date' !== e && 'id' !== e,
      );
      await this.modifierService.bulkInsert(modifierData, 'code', colOveride);
    }
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, modifierData.length);
  }

  async importInjuryNameM(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data not found');
    }
    const injuryNameData = await this.getDataSuccess(data, InjuryName);
    if (injuryNameData.length) {
      const colOveride = [...Object.keys(injuryNameData[0])].filter(
        (e) => 'injury_name_code' !== e && 'created_date' !== e && 'id' !== e,
      );
      await this.injuryNameService.bulkInsert(
        injuryNameData,
        'injury_name_code',
        colOveride,
      );
    }
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, injuryNameData.length);
  }

  async importMedicalPractice(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.csvToData(fileKey);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data not found');
    }
    const medicalPracticeData = await this.getDataSuccess(
      data,
      MedicalPractice,
    );
    if (medicalPracticeData.length) {
      const colOveride = [...Object.keys(medicalPracticeData[0])].filter(
        (e) =>
          'medical_practice_code' !== e && 'created_date' !== e && 'id' !== e,
      );
      await this.medicalPracticeService.bulkInsert(
        medicalPracticeData,
        'medical_practice_code',
        colOveride,
      );
    }
    await this.saveHistory(fileKey, data.length, authUser.account_id);
    return this.getResult(fileKey, data.length, medicalPracticeData.length);
  }

  async saveHistory(fileKey: string, totalNumber: number, account_id?: number) {
    await this.fileManagementService.saveHistoryMaster({
      file_name: fileKey,
      file_division: FileDivisionEnum.MAIN,
      account_id: account_id,
      mi_id: null,
      total_number: totalNumber,
    });
  }

  async search(
    table: MasterTable,
    keyword: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SearchMasterResponseDto>> {
    const [data, itemCount] = await this.searchMasterCase[table](
      keyword,
      pageOptionsDto,
    );
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async detail(table: MasterTable, id: number): Promise<any> {
    return this.detailMasterCase[table](id);
  }

  async update(table: MasterTable, id: number, data: any): Promise<any> {
    return this.updateMasterCase[table](id, data);
  }

  async export(table: MasterTable, keyword: string) {
    const s3ObjectInfo = await this.mediaStorageService.dataToCsv(
      (
        await this.searchExportCase[table](keyword)
      ).map((e) => {
        e.table_name = `(${e.id}) ${e.table_name}`;
        e.created_date = moment(e.created_date).format('YYYY-MM-DD');
        return e;
      }),
      [
        { id: 'created_date', title: 'インポート日' },
        { id: 'table_name', title: '(No）マスタテーブル' },
        { id: 'master_name', title: 'マスタ名' },
        {
          id: 'master_code',
          title: 'マスタコード',
        },
      ],
    );
    return this.mediaStorageService.signedGetObject(
      s3ObjectInfo.Key,
      'master_export.csv',
      true,
      null,
    );
  }

  // getResult(
  //   fileKey: string,
  //   total: number,
  //   totalSuccess: number,
  // ): ImportResultDto {
  //   return {
  //     fileKey,
  //     total,
  //     totalSuccess,
  //     error: [],
  //   };
  // }

  // async isRowSuccess(
  //   clazz: ClassConstructor<unknown>,
  //   object: any,
  // ): Promise<any> {
  //   const transformed = plainToClass(clazz, object);
  //   const errors = await validate(transformed);
  //   return errors.length === 0 ? transformed : null;
  // }

  // async getDataSuccess(data: any[], clazz: ClassConstructor<unknown>) {
  //   const result = await Promise.all(
  //     data.map((row) => this.isRowSuccess(clazz, row)),
  //   );
  //   return result.filter((row) => row);
  // }
}
