import { Module } from '@nestjs/common';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { AppraisalInformationModule } from '../appraisal-information/appraisal-information.module';
import { FileManagementModule } from '../file-management/file-management.module';
import { AbolishedMedicalPracticeMModule } from './abolished-medical-practice/abolished-medical-practice.module';
import { AuxiliaryModule } from './auxiliary/auxiliary.module';
import { CommentMModule } from './comment/comment.module';
import { ConflictRelatedModule } from './conflict-related/conflict-related.module';
import { DiscontinuedDrugMModule } from './discontinued-drug/discontinued-drug.module';
import { DispensingActModule } from './dispensing-act/dispensing-act.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorModule } from './doctor/doctor.module';
import { DrugsPresenceAbsenceModule } from './drugs-presence-absence/drugs-presence-absence.module';
import { FacilityStandardModule } from './facility-standard/facility-standard.module';
import { GeneralDrugNameModule } from './general-drug-name/general-drug-name.module';
import { HighRiskDrugModule } from './high-risk-drug/high-risk-drug.module';
import { HospitalBasicChargeTModule } from './hospital-basic-charge/hospital-basic-charge.module';
import { InclusiveModule } from './inclusive/inclusive.module';
import { InjuryNameModule } from './injury-name/injury-name.module';
import { IssuingQueryManagementModule } from './issuing-query-management/issuing_query_management.module';
import { MasterImportController } from './master-import.controller';
import { MasterImportService } from './master-import.service';
import { MedicalDepartmentController } from './medical-department/medical-department.controller';
import { MedicalDepartmentModule } from './medical-department/medical-department.module';
import { MedicalPracticeModule } from './medical-practice/medical-practice.module';
import { MessageModule } from './message/message.module';
import { ModifierModule } from './modifier/modifier.module';
import { NumberOfCalculationsTModule } from './number-of-calculations/number-of-calculations.module';
import { PaymentFundMedicalDepartmentModule } from './payment-fund-medical-department/payment-fund-medical-department.module';
import { PharmaceuticalMModule } from './pharmaceutical/pharmaceutical.module';
import { SpecificEquipmentMModule } from './specific-equipment/specific-equipment.module';
import { WardModule } from './ward/ward.module';

@Module({
  imports: [
    FileManagementModule,
    HighRiskDrugModule,
    DoctorModule,
    GeneralDrugNameModule,
    InclusiveModule,
    HospitalBasicChargeTModule,
    NumberOfCalculationsTModule,
    DiscontinuedDrugMModule,
    AuxiliaryModule,
    MedicalDepartmentModule,
    WardModule,
    CommentMModule,
    AbolishedMedicalPracticeMModule,
    ConflictRelatedModule,
    FacilityStandardModule,
    SpecificEquipmentMModule,
    PharmaceuticalMModule,
    DispensingActModule,
    PaymentFundMedicalDepartmentModule,
    ModifierModule,
    DrugsPresenceAbsenceModule,
    InjuryNameModule,
    MedicalPracticeModule,
    AppraisalInformationModule,
    MessageModule,
    IssuingQueryManagementModule,
  ],
  controllers: [
    MasterImportController,
    MedicalDepartmentController,
    DoctorController,
  ],
  providers: [MasterImportService, MediaStorageService],
  exports: [MasterImportService],
})
export class MasterModule {}
