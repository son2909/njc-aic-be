import { Module } from '@nestjs/common';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { FileManagementModule } from '../file-management/file-management.module';
import { MedicalDepartmentModule } from '../master/medical-department/medical-department.module';
import { ReceiptInformationModule } from '../receipt-information/receipt-information.module';
import { IYModule } from '../uke/IY/IY.module';
import { REModule } from '../uke/RE/RE.module';
import { SIModule } from '../uke/SI/SI.module';
import { TOModule } from '../uke/TO/TO.module';
import { AppraisalInformationModule } from './../appraisal-information/appraisal-information.module';
import { FileEvaluateController } from './file-evaluate.controller';
import { FileEvaluateService } from './file-evaluate.service';

@Module({
  imports: [
    FileManagementModule,
    AppraisalInformationModule,
    ReceiptInformationModule,
    MedicalDepartmentModule,
    REModule,
    SIModule,
    IYModule,
    TOModule,
  ],
  controllers: [FileEvaluateController],
  providers: [FileEvaluateService, MediaStorageService],
})
export class FileEvaluateModule {}
