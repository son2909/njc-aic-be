import { Module } from '@nestjs/common';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { FileManagementModule } from '../file-management/file-management.module';
import { UkeImportController } from './uke-import.controller';
import { UkeImportService } from './uke-import.service';
import { UkeCodeConversionModule } from './uke-code-conversion/uke-code-conversion.module';
import { IRModule } from './IR/IR.module';
import { REModule } from './RE/RE.module';
import { KOModule } from './KO/KO.module';
import { SYModule } from './SY/SY.module';
import { GRModule } from './GR/GR.module';
import { SJModule } from './SJ/SJ.module';
import { SNModule } from './SN/SN.module';
import { HOModule } from './HO/HO.module';
import { GOModule } from './GO/GO.module';
import { COModule } from './CO/CO.module';
import { JDModule } from './JD/JD.module';
import { SIModule } from './SI/SI.module';
import { IYModule } from './IY/IY.module';
import { TOModule } from './TO/TO.module';
import { MFModule } from './MF/MF.module';
import { ReceiptInformationModule } from '../receipt-information/receipt-information.module';
import { D_IRModule } from './DPC/D_IR/D_IR.module';
import { D_REModule } from './DPC/D_RE/D_RE.module';
import { D_KOModule } from './DPC/D_KO/D_KO.module';
import { D_HOModule } from './DPC/D_HO/D_HO.module';
import { D_SNModule } from './DPC/D_SN/D_SN.module';
import { D_JDModule } from './DPC/D_JD/D_JD.module';
import { D_SYModule } from './DPC/D_SY/D_SY.module';
import { D_MFModule } from './DPC/D_MF/D_MF.module';
import { D_SIModule } from './DPC/D_SI/D_SI.module';
import { D_COModule } from './DPC/D_CO/D_CO.module';
import { D_GRModule } from './DPC/D_GR/D_GR.module';
import { D_SJModule } from './DPC/D_SJ/D_SJ.module';
import { D_GOModule } from './DPC/D_GO/D_GO.module';
import { D_IYModule } from './DPC/D_IY/D_IY.module';
import { D_TOModule } from './DPC/D_TO/D_TO.module';
import { D_BUModule } from './DPC/D_BU/D_BU.module';
import { D_SBModule } from './DPC/D_SB/D_SB.module';
import { D_KKModule } from './DPC/D_KK/D_KK.module';
import { D_GAModule } from './DPC/D_GA/D_GA.module';
import { D_HHModule } from './DPC/D_HH/D_HH.module';
import { D_GTModule } from './DPC/D_GT/D_GT.module';
import { D_CDModule } from './DPC/D_CD/D_CD.module';
import { DeliveryFileManagementModule } from '../delivery-file-management/delivery-file-management.module';
import { REController } from './RE/RE.controller';
import { D_SKModule } from './DPC/D_SK/D_SK.module';
import { DpcErrorModule } from './DPC/dpc_error/dpc-error.module';
import { ErrorTModule } from './error/error.module';
import { FileTypeModule } from '../file-type/file-type.module';

@Module({
  imports: [
    FileManagementModule,
    UkeCodeConversionModule,
    IRModule,
    REModule,
    KOModule,
    SYModule,
    GRModule,
    SJModule,
    SNModule,
    HOModule,
    GOModule,
    COModule,
    JDModule,
    SIModule,
    IYModule,
    TOModule,
    MFModule,
    ReceiptInformationModule,
    D_IRModule,
    D_REModule,
    D_KOModule,
    D_HOModule,
    D_SNModule,
    D_JDModule,
    D_SYModule,
    D_MFModule,
    D_SIModule,
    D_COModule,
    D_GRModule,
    D_SJModule,
    D_GOModule,
    D_IYModule,
    D_TOModule,
    D_BUModule,
    D_SBModule,
    D_KKModule,
    D_GAModule,
    D_HHModule,
    D_GTModule,
    D_CDModule,
    D_SKModule,
    DeliveryFileManagementModule,
    DpcErrorModule,
    ErrorTModule,
    FileTypeModule,
  ],
  controllers: [UkeImportController, REController],
  providers: [UkeImportService, MediaStorageService],
  exports: [UkeImportService],
})
export class UkeModule {}
