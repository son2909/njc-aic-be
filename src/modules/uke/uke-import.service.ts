import { DeliveryFileManagementService } from './../delivery-file-management/delivery-file-management.service';
import { D_REService } from './DPC/D_RE/D_RE.service';
import { ReceiptInformationService } from './../receipt-information/receipt-information.service';
import { MFService } from './MF/MF.service';
import { IRService } from './IR/IR.service';
import { Role } from './../../enum/role.enum';
import { UkeCodeConversionService } from './uke-code-conversion/uke-code-conversion.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountInfo } from '../../common/account-info';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { ApiError } from '../../filter/api.error';
import { UkeCodeConversion } from './uke-code-conversion/uke-code-conversion.entity';
import { FileManagementService } from '../file-management/file-management.service';
import { FileDivisionEnum } from '../file-management/enum/file-division.enum';
import {
  convertNumberJPToNumeric,
  generateNum,
  handleMappingRowByEntity,
} from '../../utils/helper';
import { GOService } from './GO/GO.service';
import { HOService } from './HO/HO.service';
import { SNService } from './SN/SN.service';
import { GRService } from './GR/GR.service';
import { SYService } from './SY/SY.service';
import { KOService } from './KO/KO.service';
import { REService } from './RE/RE.service';
import { SJService } from './SJ/SJ.service';
import { COService } from './CO/CO.service';
import { RE } from './RE/RE.entity';
import { CO } from './CO/CO.entity';
import { IR } from './IR/IR.entity';
import { KO } from './KO/KO.entity';
import { SY } from './SY/SY.entity';
import { GR } from './GR/GR.entity';
import { SJ } from './SJ/SJ.entity';
import { SN } from './SN/SN.entity';
import { HO } from './HO/HO.entity';
import { GO } from './GO/GO.entity';
import { JD } from './JD/JD.entity';
import { JDService } from './JD/JD.service';
import { SI } from './SI/SI.entity';
import { SIService } from './SI/SI.service';
import { IY } from './IY/IY.entity';
import { IYService } from './IY/IY.service';
import { TO } from './TO/TO.entity';
import { TOService } from './TO/TO.service';
import { MF } from './MF/MF.entity';
import {
  AcknowledgmentFlagEnum,
  AllocationStatusFlagEnum,
  AssessmentFlagEnum,
  DelayedDeliveryFlagEnum,
  DeliveryStatusFlagEnum,
  ErrorFlagEnum,
  InpatientOutpatientFlagEnum,
  InspectionIncompleteFlagEnum,
  MedicalDPCFlagEnum,
  MedicalDentalFlagEnum,
  PrintStatusFlagEnum,
  ReturnDestinationEnum,
  StatusCheckFlagEnum,
} from '../receipt-information/enum';
import moment from 'moment';
import { DATE_FORMAT } from '../../constant';
import { D_IR } from './DPC/D_IR/D_IR.entity';
import { D_IRService } from './DPC/D_IR/D_IR.service';
import { D_RE } from './DPC/D_RE/D_RE.entity';
import { D_KO } from './DPC/D_KO/D_KO.entity';
import { D_KOService } from './DPC/D_KO/D_KO.service';
import { D_HO } from './DPC/D_HO/D_HO.entity';
import { D_HOService } from './DPC/D_HO/D_HO.service';
import { D_SN } from './DPC/D_SN/D_SN.entity';
import { D_SNService } from './DPC/D_SN/D_SN.service';
import { D_JD } from './DPC/D_JD/D_JD.entity';
import { D_JDService } from './DPC/D_JD/D_JD.service';
import { D_SY } from './DPC/D_SY/D_SY.entity';
import { D_SYService } from './DPC/D_SY/D_SY.service';
import { D_MF } from './DPC/D_MF/D_MF.entity';
import { D_MFService } from './DPC/D_MF/D_MF.service';
import { D_SI } from './DPC/D_SI/D_SI.entity';
import { D_SIService } from './DPC/D_SI/D_SI.service';
import { D_CO } from './DPC/D_CO/D_CO.entity';
import { D_COService } from './DPC/D_CO/D_CO.service';
import { D_GR } from './DPC/D_GR/D_GR.entity';
import { D_GRService } from './DPC/D_GR/D_GR.service';
import { D_SJ } from './DPC/D_SJ/D_SJ.entity';
import { D_SJService } from './DPC/D_SJ/D_SJ.service';
import { D_GO } from './DPC/D_GO/D_GO.entity';
import { D_GOService } from './DPC/D_GO/D_GO.service';
import { D_IY } from './DPC/D_IY/D_IY.entity';
import { D_IYService } from './DPC/D_IY/D_IY.service';
import { D_TO } from './DPC/D_TO/D_TO.entity';
import { D_TOService } from './DPC/D_TO/D_TO.service';
import { D_BU } from './DPC/D_BU/D_BU.entity';
import { D_BUService } from './DPC/D_BU/D_BU.service';
import { D_SB } from './DPC/D_SB/D_SB.entity';
import { D_SBService } from './DPC/D_SB/D_SB.service';
import { D_KK } from './DPC/D_KK/D_KK.entity';
import { D_KKService } from './DPC/D_KK/D_KK.service';
import { D_GA } from './DPC/D_GA/D_GA.entity';
import { D_GAService } from './DPC/D_GA/D_GA.service';
import { D_HH } from './DPC/D_HH/D_HH.entity';
import { D_HHService } from './DPC/D_HH/D_HH.service';
import { D_GT } from './DPC/D_GT/D_GT.entity';
import { D_GTService } from './DPC/D_GT/D_GT.service';
import { D_CD } from './DPC/D_CD/D_CD.entity';
import { D_CDService } from './DPC/D_CD/D_CD.service';
import { PayloadUkeDto } from './dto/uke-import.dto';
import {
  DeliveryStatusEnum,
  SortingStatusFlagEnum,
} from '../delivery-file-management/enum/delivery-file-management.enum';
import { FileManagement } from '../file-management/entities/file-management.entity';
import { D_SK } from './DPC/D_SK/D_SK.entity';
import { D_SKService } from './DPC/D_SK/D_SK.service';
import { DpcError } from './DPC/dpc_error/dpc-error.enitty';
import { DpcErrorService } from './DPC/dpc_error/dpc-error.service';
import { ErrorT } from './error/error.entity';
import { ErrorTService } from './error/error.service';
import { InvokeAsync } from '../../utils/lambda-utils';
import { ConfigService } from '@nestjs/config';
import { FileTypeService } from '../file-type/file-type.service';

@Injectable()
export class UkeImportService {
  constructor(
    private fileManagementService: FileManagementService,
    private mediaStorageService: MediaStorageService,
    private ukeCodeConversionService: UkeCodeConversionService,
    private iRService: IRService,
    private rEService: REService,
    private kOService: KOService,
    private sYService: SYService,
    private gRService: GRService,
    private sJService: SJService,
    private sNService: SNService,
    private hOService: HOService,
    private gOService: GOService,
    private cOService: COService,
    private jDService: JDService,
    private sIService: SIService,
    private iYService: IYService,
    private tOService: TOService,
    private mFService: MFService,
    private d_IRService: D_IRService,
    private d_REService: D_REService,
    private d_KOService: D_KOService,
    private d_HOService: D_HOService,
    private d_SNService: D_SNService,
    private d_JDService: D_JDService,
    private d_SYService: D_SYService,
    private d_MFService: D_MFService,
    private d_SIService: D_SIService,
    private d_COService: D_COService,
    private d_GRService: D_GRService,
    private d_SJService: D_SJService,
    private d_GOService: D_GOService,
    private d_IYService: D_IYService,
    private d_TOService: D_TOService,
    private d_BUService: D_BUService,
    private d_SBService: D_SBService,
    private d_KKService: D_KKService,
    private d_GAService: D_GAService,
    private d_HHService: D_HHService,
    private d_GTService: D_GTService,
    private d_CDService: D_CDService,
    private d_SKService: D_SKService,
    private receiptInformationService: ReceiptInformationService,
    private deliveryFileManagementService: DeliveryFileManagementService,
    private dpcErrorService: DpcErrorService,
    private errorTService: ErrorTService,
    private fileTypeService: FileTypeService,
    private readonly config: ConfigService,
  ) {}

  async importCodeConversionUke(fileKey: string, authUser?: AccountInfo) {
    const data = await this.mediaStorageService.importDataFromCSV(
      fileKey,
      false,
      'utf-8',
    );
    if (!data.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'File data not found');
    }
    data.shift();
    data.shift();
    const ukeCodeConversionData: UkeCodeConversion[] = data.map((row) => {
      return {
        main_code: row[0],
        code_name: row[1],
        code: convertNumberJPToNumeric(row[2]),
        content: row[3],
      } as UkeCodeConversion;
    });
    await this.ukeCodeConversionService.bulkInsert(
      ukeCodeConversionData,
      ['main_code', 'code'],
      ['code_name', 'content', 'update_date'],
    );
    await this.fileManagementService.saveHistoryUKE({
      file_name: fileKey,
      file_division: FileDivisionEnum.MAIN,
      account_id: authUser.account_id,
      mi_id: null,
      total_number: 0,
    });
  }

  /**
   * [
  'IR'- X, 'RE'- X, 'KO'- X, 'JD-X',
  'MF- QA', 'GR - X', 'SY - X', 'CO- X',
  'SI- X', 'IY-X', 'TO - X', 'HO - X',
  'SJ - X', 'SN-X', 'GO - X'
]

   */
  async importInsuranceReceiptUke(
    fileKey: string,
    authUser: AccountInfo,
    body: PayloadUkeDto,
  ) {
    const [dataUke, resultErrors] = await Promise.all([
      this.mediaStorageService.importDataFromUkeFile(fileKey),
      this.mediaStorageService.importDataFromCSV(body.error_file_key, false),
    ]);

    const { dataMap, countLine } = dataUke;

    if (!countLine || !resultErrors.length) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'File uke or result not found',
      );
    }

    const resultErrorRowSize = Object.keys(resultErrors?.[0]).length;
    if (dataMap.get('RE')?.[0]?.length !== 39 || resultErrorRowSize !== 58) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `File uke (${
          dataMap.get('RE')?.[0]?.length
        })  or result (${resultErrorRowSize}) data not correct`,
      );
    }

    const dataImportProccess = {
      fileKey,
      authUser,
      body,
      type: 'Medical',
    };
    await InvokeAsync(
      process.env.PROCCESS_IMPORT_UKE_FUNCTION_NAME,
      dataImportProccess,
      this.config.get<string>('functionInvokeKey.process_import'),
    );

    return true;
  }

  async proccessImportUke(
    fileKey: string,
    authUser: AccountInfo,
    body: PayloadUkeDto,
  ) {
    const [dataUke, resultErrors] = await Promise.all([
      this.mediaStorageService.importDataFromUkeFile(fileKey),
      this.mediaStorageService.importDataFromCSV(body.error_file_key, false),
    ]);

    const { dataMap, countLine } = dataUke;

    resultErrors.shift();

    /**
      Override uke file
     * file_management
     * file_delivery
     * file_type
     * error
     * [
        'IR'- X, 'RE'- X, 'KO'- X, 'JD-X',
        'MF- QA', 'GR - X', 'SY - X', 'CO- X',
        'SI- X', 'IY-X', 'TO - X', 'HO - X',
        'SJ - X', 'SN-X', 'GO - X'
      ]
     */
    const fileManagements =
      await this.fileManagementService.findRecordsThisMonth(
        body.request_id,
        MedicalDPCFlagEnum.MEDICAL,
      );

    const fileManagementIds: number[] = [];
    const fileTypeIds: number[] = [];
    fileManagements.forEach((value: { f_id: number; file_type_id: number }) => {
      fileManagementIds.push(value.f_id);
      fileTypeIds.push(value.file_type_id);
    });
    await Promise.all([
      this.fileManagementService.deleteMany('file_id', fileManagementIds),
      this.deliveryFileManagementService.deleteMany(
        'file_id',
        fileManagementIds,
      ),
      this.fileTypeService.deleteMany('file_type_id', fileTypeIds),
      this.errorTService.deleteMany('f_id', fileManagementIds),
      this.receiptInformationService.deleteMany('f_id', fileManagementIds),
      this.iRService.deleteMany('f_id', fileManagementIds),
      this.rEService.deleteMany('f_id', fileManagementIds),
      this.kOService.deleteMany('f_id', fileManagementIds),
      this.jDService.deleteMany('f_id', fileManagementIds),
      this.mFService.deleteMany('f_id', fileManagementIds),
      this.gRService.deleteMany('f_id', fileManagementIds),
      this.sYService.deleteMany('f_id', fileManagementIds),
      this.cOService.deleteMany('f_id', fileManagementIds),
      this.sIService.deleteMany('f_id', fileManagementIds),
      this.iYService.deleteMany('f_id', fileManagementIds),
      this.tOService.deleteMany('f_id', fileManagementIds),
      this.hOService.deleteMany('f_id', fileManagementIds),
      this.sJService.deleteMany('f_id', fileManagementIds),
      this.sNService.deleteMany('f_id', fileManagementIds),
      this.gOService.deleteMany('f_id', fileManagementIds),
    ]);

    //handle IR
    const dataIR = dataMap.get('IR');
    let mi_id =
      +authUser.account_classification === Role.CLIENT
        ? authUser.mi_id
        : dataIR[0][4];

    const fileManagement = await this.saveHistory(
      fileKey,
      authUser.account_id,
      mi_id,
      countLine,
      body.request_id,
      MedicalDPCFlagEnum.MEDICAL,
    );

    const errorFileManagement = await this.saveHistoryRC(
      body.error_file_key,
      authUser.account_id,
      mi_id,
      resultErrors.length,
      body.request_id,
      MedicalDPCFlagEnum.MEDICAL,
    );

    // insert delivery file management
    await this.saveDeliveryFileManagement(
      fileManagement,
      fileKey,
      mi_id,
      countLine,
      authUser,
    );

    // handle error file
    const errorMaps = await this.handleFileResultError<ErrorT>(
      ErrorT,
      this.errorTService,
      resultErrors,
      mi_id,
      errorFileManagement.file_id,
    );

    await Promise.all([
      this.saveIR<IR>(
        IR,
        this.iRService,
        mi_id,
        fileManagement.file_id,
        dataIR,
      ),
      this.handleRowRE(
        dataMap,
        mi_id,
        fileManagement.file_id,
        errorFileManagement.file_id,
        body,
        errorMaps,
      ),
      this.handleRowKO<KO>(
        KO,
        this.kOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSY<SY>(
        SY,
        this.sYService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowGR<GR>(
        GR,
        this.gRService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSJ<SJ>(
        SJ,
        this.sJService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSN<SN>(
        SN,
        this.sNService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowHO<HO>(
        HO,
        this.hOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowGO<GO>(
        GO,
        this.gOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowCO<CO>(
        CO,
        this.cOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSI<SI>(
        SI,
        this.sIService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowIY<IY>(
        IY,
        this.iYService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowTO<TO>(
        TO,
        this.tOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowJD<JD>(
        JD,
        this.jDService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowMF<MF>(
        MF,
        this.mFService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
    ]);
  }

  async saveDeliveryFileManagement(
    fileManagement: FileManagement,
    fileKey: string,
    mi_id: number,
    countLine: number,
    authUser: AccountInfo,
  ) {
    return this.deliveryFileManagementService.store({
      file_name: fileKey,
      file_id: fileManagement.file_id,
      mi_id: mi_id,
      file_type: fileManagement.file_type_id,
      upload_date: new Date(),
      account_id: authUser.account_id,
      total_number: countLine,
      sorting_status_flag: SortingStatusFlagEnum.NOT_ALLOCATED,
      delivery_status: DeliveryStatusEnum.BEFORE_DELIVERY,
    });
  }

  /**
   * 
   * @param fileKey 
   * @param authUser
   *  tables: [
    'IR s x', 'RE x', 'HO x', 'KO x',
    'SN x', 'JD x', 'MF x', 'BU x',
    'SB x', 'KK x', 'GA x', 'HH x',
    'GT x', 'SI s x', 'CO x', 'CD',
    'SK x', 'IY s x', 'TO s x', 'SJ x',
    'GR x', 'SY x', 'GO s x'
  ]
  prefix: D 
   */
  async importInsuranceDPCReceiptUke(
    fileKey: string,
    authUser: AccountInfo,
    body: PayloadUkeDto,
  ) {
    const [dataDPCUke, dpcResultErrors] = await Promise.all([
      this.mediaStorageService.importDataFromUkeFile(fileKey),
      this.mediaStorageService.importDataFromCSV(body.error_file_key, false),
    ]);
    const { dataMap, countLine } = dataDPCUke;

    if (!countLine || !dpcResultErrors.length) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'File DPC uke or DPC result not found',
      );
    }

    const dpcResultErrorRowSize = Object.keys(dpcResultErrors?.[0]).length;
    if (dataMap.get('RE')?.[0]?.length !== 31 || dpcResultErrorRowSize !== 44) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `File DPC uke (${
          dataMap.get('RE')?.[0]?.length
        })  or DPC result (${dpcResultErrorRowSize}) data not correct`,
      );
    }
    const dataImportProccess = {
      fileKey,
      authUser,
      body,
      type: 'DPC',
    };
    await InvokeAsync(
      process.env.PROCCESS_IMPORT_UKE_FUNCTION_NAME,
      dataImportProccess,
      this.config.get<string>('functionInvokeKey.process_import'),
    );
    return true;
  }

  async proccessImportDpcUke(
    fileKey: string,
    authUser: AccountInfo,
    body: PayloadUkeDto,
  ) {
    const [dataDPCUke, dpcResultErrors] = await Promise.all([
      this.mediaStorageService.importDataFromUkeFile(fileKey),
      this.mediaStorageService.importDataFromCSV(body.error_file_key, false),
    ]);
    const { dataMap, countLine } = dataDPCUke;

    dpcResultErrors.shift();

    /**
      Override uke file
     * file_management
     * file_delivery
     * file_type
     * dpcError
     * [
        'IR s x', 'RE x', 'HO x', 'KO x',
        'SN x', 'JD x', 'MF x', 'BU x',
        'SB x', 'KK x', 'GA x', 'HH x',
        'GT x', 'SI s x', 'CO x', 'CD',
        'SK x', 'IY s x', 'TO s x', 'SJ x',
        'GR x', 'SY x', 'GO s x'
      ]
      prefix: D
     */
    const fileManagements =
      await this.fileManagementService.findRecordsThisMonth(
        body.request_id,
        MedicalDPCFlagEnum.DPC,
      );

    const fileManagementIds: number[] = [];
    const fileTypeIds: number[] = [];
    fileManagements.forEach((value: { f_id: number; file_type_id: number }) => {
      fileManagementIds.push(value.f_id);
      fileTypeIds.push(value.file_type_id);
    });
    await Promise.all([
      this.fileManagementService.deleteMany('file_id', fileManagementIds),
      this.deliveryFileManagementService.deleteMany(
        'file_id',
        fileManagementIds,
      ),
      this.fileTypeService.deleteMany('file_type_id', fileTypeIds),
      this.dpcErrorService.deleteMany('f_id', fileManagementIds),
      this.receiptInformationService.deleteMany('f_id', fileManagementIds),
      this.d_IRService.deleteMany('f_id', fileManagementIds),
      this.d_REService.deleteMany('f_id', fileManagementIds),
      this.d_HOService.deleteMany('f_id', fileManagementIds),
      this.d_KOService.deleteMany('f_id', fileManagementIds),
      this.d_SNService.deleteMany('f_id', fileManagementIds),
      this.d_JDService.deleteMany('f_id', fileManagementIds),
      this.d_MFService.deleteMany('f_id', fileManagementIds),
      this.d_BUService.deleteMany('f_id', fileManagementIds),
      this.d_SBService.deleteMany('f_id', fileManagementIds),
      this.d_KKService.deleteMany('f_id', fileManagementIds),
      this.d_GAService.deleteMany('f_id', fileManagementIds),
      this.d_HHService.deleteMany('f_id', fileManagementIds),
      this.d_GTService.deleteMany('f_id', fileManagementIds),
      this.d_SIService.deleteMany('f_id', fileManagementIds),
      this.d_COService.deleteMany('f_id', fileManagementIds),
      this.d_CDService.deleteMany('f_id', fileManagementIds),
      this.d_SKService.deleteMany('f_id', fileManagementIds),
      this.d_IYService.deleteMany('f_id', fileManagementIds),
      this.d_TOService.deleteMany('f_id', fileManagementIds),
      this.d_SJService.deleteMany('f_id', fileManagementIds),
      this.d_GRService.deleteMany('f_id', fileManagementIds),
      this.d_SYService.deleteMany('f_id', fileManagementIds),
      this.d_GOService.deleteMany('f_id', fileManagementIds),
    ]);

    //handle IR
    const dataIR = dataMap.get('IR');
    let mi_id =
      +authUser.account_classification === Role.CLIENT
        ? authUser.mi_id
        : dataIR[0][4];

    const fileManagement = await this.saveHistory(
      fileKey,
      authUser.account_id,
      mi_id,
      countLine,
      body.request_id,
      MedicalDPCFlagEnum.DPC,
    );

    const dpcErrorFileManaement = await this.saveHistoryRC(
      body.error_file_key,
      authUser.account_id,
      mi_id,
      dpcResultErrors.length,
      body.request_id,
      MedicalDPCFlagEnum.DPC,
    );

    // insert delivery file management
    await this.saveDeliveryFileManagement(
      fileManagement,
      fileKey,
      mi_id,
      countLine,
      authUser,
    );

    //handle dpc result
    const errorMaps = await this.handleFileResultError<DpcError>(
      DpcError,
      this.dpcErrorService,
      dpcResultErrors,
      mi_id,
      dpcErrorFileManaement.file_id,
    );

    await Promise.all([
      this.saveIR<D_IR>(
        D_IR,
        this.d_IRService,
        mi_id,
        fileManagement.file_id,
        dataIR,
      ),
      this.handleRowD_RE(
        dataMap,
        mi_id,
        fileManagement.file_id,
        dpcErrorFileManaement.file_id,
        body,
        errorMaps,
      ),
      this.handleRowKO<D_KO>(
        D_KO,
        this.d_KOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowHO<D_HO>(
        D_HO,
        this.d_HOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSN<D_SN>(
        D_SN,
        this.d_SNService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowJD<D_JD>(
        D_JD,
        this.d_JDService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSY<D_SY>(
        D_SY,
        this.d_SYService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowMF<D_MF>(
        D_MF,
        this.d_MFService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSI<D_SI>(
        D_SI,
        this.d_SIService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowCO<D_CO>(
        D_CO,
        this.d_COService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowGR<D_GR>(
        D_GR,
        this.d_GRService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSJ<D_SJ>(
        D_SJ,
        this.d_SJService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowGO<D_GO>(
        D_GO,
        this.d_GOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowIY<D_IY>(
        D_IY,
        this.d_IYService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowTO<D_TO>(
        D_TO,
        this.d_TOService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowBU<D_BU>(
        D_BU,
        this.d_BUService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSB<D_SB>(
        D_SB,
        this.d_SBService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowKK<D_KK>(
        D_KK,
        this.d_KKService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowGA<D_GA>(
        D_GA,
        this.d_GAService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowHH<D_HH>(
        D_HH,
        this.d_HHService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowSK<D_SK>(
        D_SK,
        this.d_SKService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowGT<D_GT>(
        D_GT,
        this.d_GTService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
      this.handleRowCD<D_CD>(
        D_CD,
        this.d_CDService,
        dataMap,
        mi_id,
        fileManagement.file_id,
      ),
    ]);
  }

  async handleFileResultError<T>(
    EntityClass: new () => T,
    service: any,
    data: any[],
    mi_id: number,
    f_id: number,
  ) {
    const result = handleMappingRowByEntity(EntityClass, data, [
      'mi_id',
      'f_id',
      'p_id',
      'hidden',
      'error_contents_update',
    ]);

    const errorMaps: Map<string, any[]> = new Map<string, any[]>();
    const dataToSave: any[] = result.map((value, _) => {
      const p_id = value.medical_record_number;
      const objValue = {
        ...value,
        mi_id,
        f_id,
        p_id,
        hidden: null,
        error_contents_update: null,
      };
      if (errorMaps.has(p_id)) {
        const curData = errorMaps.get(p_id);
        curData.push(objValue);
        errorMaps.set(p_id, curData);
      } else {
        errorMaps.set(p_id, [objValue]);
      }
      return objValue;
    });

    await service.insertMany(dataToSave);

    return errorMaps;
  }

  async handleRowCD<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataCD = dataMap.get('CD');
    const result = handleMappingRowByEntity(EntityClass, dataCD, [
      'mi_id',
      'f_id',
      'num1',
      'num2',
      'memo',
    ]);

    let maxIndex = 1;
    const dataToSave: any[] = result.map((value, idx) => {
      if (value?.clinical_identification && idx > 0) {
        maxIndex++;
      }
      return {
        ...value,
        mi_id,
        f_id,
        memo: null,
        num1: generateNum(mi_id, f_id, idx + 1),
        num2: generateNum(mi_id, f_id, maxIndex),
      };
    });
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowGT<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataGT = dataMap.get('GT');
    const result = handleMappingRowByEntity(EntityClass, dataGT, [
      'mi_id',
      'f_id',
      'num1',
      'num2',
    ]);

    let maxIndex = 1;
    const dataToSave: any[] = result.map((value, idx) => {
      if (value?.clinical_identification && idx > 0) {
        maxIndex++;
      }
      return {
        ...value,
        mi_id,
        f_id,
        num1: generateNum(mi_id, f_id, idx + 1),
        num2: generateNum(mi_id, f_id, maxIndex),
      };
    });
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowHH<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataHH = dataMap.get('HH');
    const result = handleMappingRowByEntity(EntityClass, dataHH, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowSK<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataSK = dataMap.get('SK');
    const result = handleMappingRowByEntity(EntityClass, dataSK, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowGA<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataGA = dataMap.get('GA');
    const result = handleMappingRowByEntity(EntityClass, dataGA, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowKK<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataKK = dataMap.get('KK');
    const result = handleMappingRowByEntity(EntityClass, dataKK, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowSB<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataSB = dataMap.get('SB');
    const result = handleMappingRowByEntity(EntityClass, dataSB, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowBU<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataBU = dataMap.get('BU');
    const result = handleMappingRowByEntity(EntityClass, dataBU, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowMF<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataMF = dataMap.get('MF');
    const result = handleMappingRowByEntity(EntityClass, dataMF, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowJD<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataJD = dataMap.get('JD');
    const result = handleMappingRowByEntity(EntityClass, dataJD, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowTO<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataTO = dataMap.get('TO');
    const result = handleMappingRowByEntity(EntityClass, dataTO, [
      'mi_id',
      'f_id',
      'num1',
      'num2',
      'memo',
    ]);

    let maxIndex = 1;
    const dataToSave: any[] = result.map((value, idx) => {
      if (value?.clinical_identification && idx > 0) {
        maxIndex++;
      }
      return {
        ...value,
        mi_id,
        f_id,
        memo: null,
        num1: generateNum(mi_id, f_id, idx + 1),
        num2: generateNum(mi_id, f_id, maxIndex),
      };
    });
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowSI<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataSI = dataMap.get('SI');
    const result = handleMappingRowByEntity(EntityClass, dataSI, [
      'mi_id',
      'f_id',
      'num1',
      'num2',
      'memo',
    ]);

    let maxIndex = 1;
    const dataToSave: any[] = result.map((value, idx) => {
      if (value?.clinical_identification && idx > 0) {
        maxIndex++;
      }
      return {
        ...value,
        mi_id,
        f_id,
        memo: null,
        num1: generateNum(mi_id, f_id, idx + 1),
        num2: generateNum(mi_id, f_id, maxIndex),
      };
    });
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowIY<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataIY = dataMap.get('IY');
    const result = handleMappingRowByEntity(EntityClass, dataIY, [
      'mi_id',
      'f_id',
      'num1',
      'num2',
      'memo',
    ]);

    let maxIndex = 1;
    const dataToSave: any[] = result.map((value, idx) => {
      if (value?.clinical_identification && idx > 0) {
        maxIndex++;
      }
      return {
        ...value,
        mi_id,
        f_id,
        memo: null,
        num1: generateNum(mi_id, f_id, idx + 1),
        num2: generateNum(mi_id, f_id, maxIndex),
      };
    });
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowCO<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataCO = dataMap.get('CO');
    const result = handleMappingRowByEntity(EntityClass, dataCO, [
      'mi_id',
      'f_id',
      'num1',
      'num2',
      'memo',
    ]);

    let maxIndex = 1;
    const dataToSave: any[] = result.map((value, idx) => {
      if (value?.clinical_identification && idx > 0) {
        maxIndex++;
      }
      return {
        ...value,
        mi_id,
        f_id,
        memo: null,
        num1: generateNum(mi_id, f_id, idx + 1),
        num2: generateNum(mi_id, f_id, maxIndex),
      };
    });
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowGO<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataGO = dataMap.get('GO');
    const result = handleMappingRowByEntity(EntityClass, dataGO, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowHO<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataHO = dataMap.get('HO');
    const result = handleMappingRowByEntity(EntityClass, dataHO, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowSN<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataSN = dataMap.get('SN');
    const result = handleMappingRowByEntity(EntityClass, dataSN, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowSJ<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataSJ = dataMap.get('SJ');
    const result = handleMappingRowByEntity(EntityClass, dataSJ, [
      'mi_id',
      'f_id',
      'num1',
      'memo',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      memo: null,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowGR<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataGR = dataMap.get('GR');
    const result = handleMappingRowByEntity(EntityClass, dataGR, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate

    await service.insertMany(dataToSave);
  }

  async handleRowSY<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataSY = dataMap.get('SY');
    const result = handleMappingRowByEntity(EntityClass, dataSY, [
      'mi_id',
      'f_id',
      'num1',
      'memo',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      memo: null,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate
    await service.insertMany(dataToSave);
  }

  async handleRowKO<T>(
    EntityClass: new () => T,
    service: any,
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
  ) {
    const dataKO = dataMap.get('KO');
    const result = handleMappingRowByEntity(EntityClass, dataKO, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const dataToSave: any[] = result.map((value, idx) => ({
      ...value,
      mi_id,
      f_id,
      num1: generateNum(mi_id, f_id, idx + 1),
    }));
    // TODO: validate
    await service.insertMany(dataToSave);
  }

  async handleRowD_RE(
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
    error_f_id: number,
    body: PayloadUkeDto,
    errorMaps: Map<string, any[]>,
  ) {
    const dataRE = dataMap.get('RE');
    const dataIR = dataMap.get('IR');
    const result = handleMappingRowByEntity(D_RE, dataRE, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const ukeCodes = await this.ukeCodeConversionService.findAll();

    const receiptInfoToSaves: Record<string, any>[] = [];
    const dataToSave: Record<string, any>[] = result.map((value: D_RE, idx) => {
      const errors = errorMaps.get(value.medical_record_number);
      const receiptInfoToSave = {
        mi_id,
        f_id,
        p_id: value.medical_record_number,
        error_f_id,
        satei_f_id: null,
        file_division: body.file_division,
        receipt_type: value.receipt_type,
        doctor_name: null,
        doctor_id: null,
        account_id: null,
        group_id: null,
        account_id2: null,
        invoice_id: null,
        clinical_department: value.department_name ?? '',
        total_score: 0,
        medical_dpc_flag: MedicalDPCFlagEnum.DPC,
        medical_dental_flag: MedicalDentalFlagEnum.MEDICAL,
        inpatient_outpatient_flag: this.convertReceiptType(
          ukeCodes,
          value.receipt_type,
        ),
        social_national_flag: dataIR[0][1],
        return_destination: ReturnDestinationEnum.DOCTOR,
        error_flag: errors?.length
          ? ErrorFlagEnum.ERROR
          : ErrorFlagEnum.NO_ERROR,
        acknowledgment_flag: AcknowledgmentFlagEnum.POINTED_OUT,
        allocation_status_flag: AllocationStatusFlagEnum.NOT_IMPLEMENTED,
        status_check_flag: StatusCheckFlagEnum.NOT_IMPLEMENTED,
        print_status_flag: PrintStatusFlagEnum.NOT_IMPLEMENTED,
        delivery_status_flag: DeliveryStatusFlagEnum.NOT_IMPLEMENTED,
        data_received_date: new Date(),
        billing_date: moment(`${dataIR[0][7]}`, DATE_FORMAT).toDate(),
        date_of_medical_treatment: moment(
          `${value.date_of_medical_treatment}`,
          DATE_FORMAT,
        ).toDate(),
        deadline_for_inspection: null,
        inspection_completion_date: null,
        inspection_time: null,
        delivery_deadline: body.delivery_deadline,
        delivery_completion_date: null,
        assessment_flag: AssessmentFlagEnum.NO,
        delayed_delivery_flag: DelayedDeliveryFlagEnum.NO_DELAY,
        inspection_incomplete_flag: InspectionIncompleteFlagEnum.COMPLETED,
        note_contents: null,
        error1: null,
        error2: null,
        error3: null,
        error4: null,
        error5: null,
        error6: null,
        error7: null,
        error8: null,
        error9: null,
        error10: null,
        error11: null,
        error12: null,
        error13: null,
        error14: null,
        error15: null,
        error16: null,
        error17: null,
        error18: null,
        error19: null,
        error20: null,
      };
      receiptInfoToSaves.push(receiptInfoToSave);
      return {
        ...value,
        mi_id,
        f_id,
        num1: generateNum(mi_id, f_id, idx + 1),
      };
    });
    // TODO: convert doctor_id => doctor_name & department_id => clinical_department
    // Save data RE & insert to table Receipt info
    await Promise.all([
      this.d_REService.insertMany(dataToSave),
      this.receiptInformationService.insertMany(receiptInfoToSaves),
    ]);
  }

  async handleRowRE(
    dataMap: Map<string, any>,
    mi_id: number,
    f_id: number,
    error_f_id: number,
    body: PayloadUkeDto,
    errorMaps: Map<string, any[]>,
  ) {
    const dataRE = dataMap.get('RE');
    const dataIR = dataMap.get('IR');
    const result = handleMappingRowByEntity(RE, dataRE, [
      'mi_id',
      'f_id',
      'num1',
    ]);

    const ukeCodes = await this.ukeCodeConversionService.findAll();

    const receiptInfoToSaves: Record<string, any>[] = [];
    const dataToSave: Record<string, any>[] = result.map((value: RE, idx) => {
      const errors = errorMaps.get(value.mrint);
      const receiptInfoToSave = {
        mi_id,
        f_id,
        p_id: value.mrint,
        error_f_id,
        satei_f_id: null,
        file_division: body.file_division,
        receipt_type: value.receipt_type,
        doctor_name: null,
        doctor_id: null,
        account_id: null,
        group_id: null,
        account_id2: null,
        invoice_id: null,
        clinical_department:
          value.department_name_2 ?? value.department_name_3 ?? '',
        total_score: 0,
        medical_dpc_flag: MedicalDPCFlagEnum.MEDICAL,
        medical_dental_flag: MedicalDentalFlagEnum.MEDICAL,
        inpatient_outpatient_flag: this.convertReceiptType(
          ukeCodes,
          value.receipt_type,
        ),
        social_national_flag: dataIR[0][1],
        return_destination: ReturnDestinationEnum.DOCTOR,
        error_flag: errors?.length
          ? ErrorFlagEnum.ERROR
          : ErrorFlagEnum.NO_ERROR,
        acknowledgment_flag: AcknowledgmentFlagEnum.POINTED_OUT,
        allocation_status_flag: AllocationStatusFlagEnum.NOT_IMPLEMENTED,
        status_check_flag: StatusCheckFlagEnum.NOT_IMPLEMENTED,
        print_status_flag: PrintStatusFlagEnum.NOT_IMPLEMENTED,
        delivery_status_flag: DeliveryStatusFlagEnum.NOT_IMPLEMENTED,
        data_received_date: new Date(),
        billing_date: moment(`${dataIR[0][7]}`, DATE_FORMAT).toDate(),
        date_of_medical_treatment: moment(
          `${value.date_of_medical_treatment}`,
          DATE_FORMAT,
        ).toDate(),
        deadline_for_inspection: null,
        inspection_completion_date: null,
        inspection_time: null,
        delivery_deadline: body.delivery_deadline,
        delivery_completion_date: null,
        assessment_flag: AssessmentFlagEnum.NO,
        delayed_delivery_flag: DelayedDeliveryFlagEnum.NO_DELAY,
        inspection_incomplete_flag: InspectionIncompleteFlagEnum.COMPLETED,
        note_contents: null,
        error1: null,
        error2: null,
        error3: null,
        error4: null,
        error5: null,
        error6: null,
        error7: null,
        error8: null,
        error9: null,
        error10: null,
        error11: null,
        error12: null,
        error13: null,
        error14: null,
        error15: null,
        error16: null,
        error17: null,
        error18: null,
        error19: null,
        error20: null,
      };
      receiptInfoToSaves.push(receiptInfoToSave);
      return {
        ...value,
        mi_id,
        f_id,
        num1: generateNum(mi_id, f_id, idx + 1),
      };
    });
    // TODO: convert doctor_id => doctor_name & department_id => clinical_department
    // Save data RE & insert to table Receipt info
    await Promise.all([
      this.rEService.insertMany(dataToSave),
      this.receiptInformationService.insertMany(receiptInfoToSaves),
    ]);
  }

  async saveIR<T>(
    EntityClass: new () => T,
    service: any,
    mi_id: number,
    f_id: number,
    dataIR: any[],
  ) {
    const iR: any = new EntityClass();
    iR.mi_id = mi_id;
    iR.f_id = f_id;
    iR.num1 = generateNum(mi_id, f_id, 1);
    iR.identification_information = dataIR[0][0];
    iR.examination_payment_agency = dataIR[0][1];
    iR.prefectures = dataIR[0][2];
    iR.score_table = dataIR[0][3];
    iR.medical_institution_code = dataIR[0][4];
    iR.spare = dataIR[0][5] || null;
    iR.medical_institution_name = dataIR[0][6];
    iR.billing_date = dataIR[0][7];
    iR.multi_volume_identification_information = dataIR[0][8];
    iR.telephone_number = dataIR[0][9];

    await service.store(iR);
  }

  async saveHistory(
    fileKey: string,
    account_id: number,
    mi_id: number,
    total_number: number,
    request_id: string,
    request_type: number,
  ) {
    return this.fileManagementService.saveHistoryUKE({
      file_name: fileKey,
      file_division: FileDivisionEnum.MAIN,
      account_id,
      mi_id,
      total_number: total_number,
      request_id,
      request_type,
    });
  }

  async saveHistoryRC(
    fileKey: string,
    account_id: number,
    mi_id: number,
    total_number: number,
    request_id: string,
    request_type: number,
  ) {
    return this.fileManagementService.saveHistoryRC({
      file_name: fileKey,
      file_division: FileDivisionEnum.MAIN,
      account_id,
      mi_id,
      total_number: total_number,
      request_id,
      request_type,
    });
  }

  convertReceiptType(ukeCodes: UkeCodeConversion[], receipt_type: string) {
    const code = ukeCodes.find((e) => e.code === receipt_type);

    if (!code) return InpatientOutpatientFlagEnum.INPATIENT;

    const transformCode = code.content.split(',');
    return transformCode[transformCode.length - 1].includes(`入院外`)
      ? InpatientOutpatientFlagEnum.OUTPATIENT
      : InpatientOutpatientFlagEnum.INPATIENT;
  }
}
