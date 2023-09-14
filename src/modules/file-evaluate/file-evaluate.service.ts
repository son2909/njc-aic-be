import { HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AccountInfo } from '../../common/account-info';
import { ApiError } from '../../filter/api.error';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { HEADER_PDF_FILE } from '../../utils/excel/excel-header.constant';
import { ExcelUtil } from '../../utils/excel/excel.utils';
import {
  DATE_FORMAT,
  dateToNumberFormat,
  dateToStr,
  generateNum,
  getPropertiesEntity,
  gyymmToDate,
  numberToDate,
  strToDate,
  strToPercent,
} from '../../utils/helper';
import { ImportBaseService } from '../../utils/import-base.service';
import { AppraisalInformationService } from '../appraisal-information/appraisal-information.service';
import { AppraisalInformation } from '../appraisal-information/entities/appraisal-information.entity';
import { FileManagement } from '../file-management/entities/file-management.entity';
import { FileDivisionEnum } from '../file-management/enum/file-division.enum';
import { FileManagementService } from '../file-management/file-management.service';
import { MedicalDepartment } from '../master/medical-department/medical-department.entity';
import { MedicalDepartmentService } from '../master/medical-department/medical-department.service';
import { AssessmentFlagEnum } from '../receipt-information/enum';
import { IYService } from '../uke/IY/IY.service';
import { SIService } from '../uke/SI/SI.service';
import { TOService } from '../uke/TO/TO.service';
import { ReceiptInformationService } from './../receipt-information/receipt-information.service';
import { REService } from './../uke/RE/RE.service';
import { ImportAppraisalInformationCsvDto } from './dto/import-appraisal-information-csv.dto';
import { ImportAppraisalInformationExcelDto } from './dto/import-appraisal-information-excel.dto';
import { InsuranceEnum } from './enum/insurance-enum';
import { Role } from '../../enum';

@Injectable()
export class FileEvaluateService extends ImportBaseService {
  constructor(
    private fileManagementService: FileManagementService,
    private mediaStorageService: MediaStorageService,
    private appraisalInformationService: AppraisalInformationService,
    private receiptInformationService: ReceiptInformationService,
    private departmentService: MedicalDepartmentService,
    private reService: REService,
    private siService: SIService,
    private iyService: IYService,
    private toService: TOService,
  ) {
    super();
  }

  // 査定ファイル（そのまま）_国保DPC増減点連絡書3022.csv
  async importAppraisalInformation(fileKey: string, authUser?: AccountInfo) {
    const headers = await this.mediaStorageService.getHeaders(fileKey);
    // get mi_id in first line
    // const mi_id = 9999999; //fake
    const mi_id =
      parseInt(authUser.account_classification) === Role.CLIENT.valueOf()
        ? authUser.mi_id
        : parseInt(headers[4]);
    // get data from second line
    const data = await this.mediaStorageService.csvToDataSkipLine(fileKey, 1);
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data empty');
    }
    const insuranceName = this.getInsuranceByFileKey(fileKey);
    const aiListCsv = data
      .map((e) => {
        const aiElement = plainToClass(ImportAppraisalInformationCsvDto, e);
        if (aiElement.post_assessment_content) {
          const arrs = aiElement.post_assessment_content.split(/　+/);
          aiElement.key_medical_practice_m = arrs[0] || null;
          aiElement.key_pharmaceutical = arrs[1] || null;
          aiElement.key_specific_equipment = arrs[2] || null;
        }
        aiElement.date_medical_treatment = gyymmToDate(
          aiElement.date_medical_treatment_str,
        );
        aiElement.date_of_medical_treatment = aiElement.date_medical_treatment;
        aiElement.mi_id = mi_id;
        if (
          aiElement.insurer_number &&
          aiElement.insurer_number.toString().startsWith('12')
        ) {
          aiElement.insurance = InsuranceEnum.BHS;
        } else {
          aiElement.insurance = insuranceName;
        }
        return aiElement;
      })
      .filter((e) => e.idx !== 5);
    await this.handleTransferData(aiListCsv);

    const fileSaved: FileManagement =
      await this.fileManagementService.saveHistoryEvaluate({
        account_id: authUser.account_id,
        file_division: FileDivisionEnum.MAIN,
        file_name: fileKey,
        mi_id: authUser.mi_id,
        total_number: aiListCsv.length,
      });

    let dataSuccess = [];
    // handle type Third
    const _3th = await this.getThird(
      aiListCsv.filter((e) => e.idx === 3),
      fileSaved.file_id,
    );
    dataSuccess = dataSuccess.concat(_3th);
    // handle type Fourth
    const _4th = await this.getFourth(
      aiListCsv.filter((e) => e.idx === 4),
      fileSaved.file_id,
    );
    dataSuccess = dataSuccess.concat(_4th);

    await this.saveAppraisalInformationCsv(dataSuccess);
    return this.getResult(fileKey, data.length, dataSuccess.length);
  }

  async handleTransferData(data: ImportAppraisalInformationCsvDto[]) {
    if (data.length) {
      // TODO: copy data
      let dmt_str_sample = data[0].date_medical_treatment_str;
      let dmt_sample = data[0].date_medical_treatment;
      let mrn = data[0].medical_record_number;
      for (let i = 1; i < data.length; i++) {
        const element = data[i];
        if (!element.date_medical_treatment_str) {
          element.date_medical_treatment_str = dmt_str_sample;
          element.date_medical_treatment = dmt_sample;
          element.date_of_medical_treatment = dmt_sample;
        } else {
          dmt_str_sample = element.date_medical_treatment_str;
          dmt_sample = element.date_medical_treatment;
        }
        if (!element.medical_record_number) {
          element.medical_record_number = mrn;
        } else {
          mrn = element.medical_record_number;
        }
      }
      //TODO: set clinical_identification
      await Promise.all(
        data.map((e) => {
          return this.setClinicalIdentification(e);
        }),
      );
      //TODO: set field from re_t
      await Promise.all(
        data.map((e) => {
          return this.setRE_T(e);
        }),
      );
    }
  }

  async setClinicalIdentification(element: ImportAppraisalInformationCsvDto) {
    // Medical_practice_M   => SI
    if (!element.clinical_identification && element.key_medical_practice_m) {
      const si = await this.siService.findByJoinMedicalPractice(
        element.key_medical_practice_m,
        element.mi_id,
      );
      if (si) {
        element.value_medical_practice_m = si.medical_practice_code;
        element.clinical_identification = si.clinical_identification;
      }
    }
    // Pharmaceutical_M     => IY
    if (!element.clinical_identification && element.key_pharmaceutical) {
      const iy = await this.iyService.findByJoinPharmaceutical(
        element.key_medical_practice_m,
        element.mi_id,
      );
      if (iy) {
        element.value_pharmaceutical = iy.drug_code;
        element.clinical_identification = iy.clinical_identification;
      }
    }
    // Specific_equipment_M => TO
    if (!element.clinical_identification && element.key_specific_equipment) {
      const to = await this.toService.findByJoinSpecificEquipment(
        element.key_medical_practice_m,
        element.mi_id,
      );
      if (to) {
        element.value_specific_equipment = to.specified_equipment_code;
        element.clinical_identification = to.clinical_identification;
      }
    }
    return element;
  }

  async setRE_T(element: ImportAppraisalInformationCsvDto) {
    const res = await this.reService.findByDateOfMedicalTreatment(
      element.mi_id,
      dateToNumberFormat(element.date_of_medical_treatment),
    );
    if (res) {
      element.ward = res.ward_classification;
      element.date_medical_treatment = numberToDate(
        res[0].date_of_medical_treatment,
      );
      element.sex = res.gender_classification + '';
      element.date_of_birth = dateToStr(
        numberToDate(res.date_of_birth, 'YYYYMMDD'),
        'YYYY/MM/DD',
      );
      element.insurance_benefit_ratio = res.benefit_ratio;
    }
    return element;
  }

  async getFourth(data: ImportAppraisalInformationCsvDto[], f_id: number) {
    const appraisalInformations: AppraisalInformation[] =
      await this.getDataSuccess(data, AppraisalInformation, true);
    appraisalInformations.forEach((e) => {
      e.f_id = f_id;
    });
    return appraisalInformations;
  }

  async getThird(data: ImportAppraisalInformationCsvDto[], f_id: number) {
    const appraisalInformations: AppraisalInformation[] =
      await this.getDataSuccess(data, AppraisalInformation, true);
    await this.replaceAssessmentFlag(appraisalInformations);
    appraisalInformations.forEach((e) => {
      e.f_id = f_id;
    });
    return appraisalInformations;
  }

  async saveAppraisalInformationCsv(
    appraisalInformations: AppraisalInformation[],
  ) {
    if (appraisalInformations.length) {
      const dataSave = appraisalInformations.map((e, idx) => {
        return {
          ...e,
          num_1: generateNum(e.m_id, e.f_id, idx + 1),
        };
      });
      const unique = [
        'f_id',
        'm_id',
        'num_1',
        'medical_record_number',
        'clinical_identification',
      ];
      await this.appraisalInformationService.bulkInsert(
        dataSave,
        unique,
        getPropertiesEntity(AppraisalInformation).filter(
          (key) => ![...unique, 'created_date', 'id'].includes(key),
        ),
      );
    }
  }

  async replaceAssessmentFlag(data: AppraisalInformation[]) {
    data.forEach(async (e) => {
      const receipts =
        await this.receiptInformationService.findByDateOfMedicalTreatment(
          e.m_id,
          e.date_of_medical_treatment,
        );
      if (receipts.length) {
        receipts.forEach((r) => {
          r.assessment_flag = AssessmentFlagEnum.YES;
          r.update_date = new Date();
        });
        await this.receiptInformationService.store(receipts);
      }
    });
  }

  // upload/pdf.xlsx
  async importReceiptInformation(
    fileKey: string,
    mi_id: number,
    authUser?: AccountInfo,
  ) {
    const fileStream = await this.mediaStorageService.getFileStream(fileKey);
    const data = ExcelUtil.builder(
      fileStream,
      ImportAppraisalInformationExcelDto,
    )
      .headerOptions({
        header: HEADER_PDF_FILE,
      })
      .data();
    const dataSuccess = await this.getDataSuccess(
      data,
      ImportAppraisalInformationExcelDto,
    );
    if (!!dataSuccess.length) {
      const department_contents = dataSuccess.map((e) => e.department_content);
      const departments: MedicalDepartment[] =
        await this.departmentService.findByContentIn(department_contents);
      const mapDepartment = new Map(
        departments.map((e) => [e.content, e.code]),
      );
      dataSuccess.forEach((e) => {
        e.department_code = mapDepartment.get(e.department_content) || null;
        e.mi_id = mi_id;
      });
      await this.saveAppraisalInformationExcel(fileKey, dataSuccess, authUser);
    }
    return this.getResult(fileKey, data.length, dataSuccess.length);
  }

  async saveAppraisalInformationExcel(
    fileKey: string,
    dataSuccess: ImportAppraisalInformationExcelDto[],
    authUser?: AccountInfo,
  ) {
    const fileManagement: FileManagement =
      await this.fileManagementService.saveHistoryEvaluate({
        account_id: authUser.account_id,
        file_division: FileDivisionEnum.MAIN,
        file_name: fileKey,
        mi_id: authUser.mi_id,
        total_number: dataSuccess.length,
      });
    if (dataSuccess.length) {
      const appraisalInformations: AppraisalInformation[] = dataSuccess.map(
        (e) => {
          const _e = plainToClass(AppraisalInformation, e, {
            excludeExtraneousValues: true,
          });
          _e.date_medical_treatment = strToDate(
            e.date_medical_treatment_str,
            DATE_FORMAT.YYYYMM,
          );
          _e.insurance_benefit_ratio = strToPercent(e.insurance_benefit_ratio);
          _e.date_of_medical_treatment = _e.date_medical_treatment;
          _e.f_id = fileManagement.file_id;
          return _e;
        },
      );
      const dataSave = appraisalInformations.map((e, idx) => {
        return {
          ...e,
          num_1: generateNum(e.m_id, e.f_id, idx + 1),
        };
      });
      const unique = [
        'f_id',
        'm_id',
        'num_1',
        'medical_record_number',
        'clinical_identification',
      ];
      await this.appraisalInformationService.bulkInsert(
        dataSave,
        unique,
        getPropertiesEntity(AppraisalInformation).filter(
          (key) => ![...unique, 'created_date', 'id'].includes(key),
        ),
      );
    }
  }

  getInsuranceByFileKey(fileKey: string) {
    if (fileKey.includes(InsuranceEnum.BHNN)) {
      return InsuranceEnum.BHNN;
    }
    if (fileKey.includes(InsuranceEnum.BHXH)) {
      return InsuranceEnum.BHXH;
    }
    return null;
  }
}
