import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import {
  APP_YEAR_MONTH_FORMAT,
  ReturnDestinations,
  StatusCheckFlags,
  TEMPLATE_KEY,
  getGenderClassification,
  PAGE_FORMAT,
} from 'src/constant';
import { MediaStorageService } from 'src/media-storage/media-storage.service';
import {
  calculateAge,
  calculateDays,
  convertStrToFormat,
  numberWithCommas,
} from 'src/utils/helper';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { AccountInfo } from '../../common/account-info';
import { PageMetaDto } from '../../common/dto/pagination-meta.dto';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { PageDto } from '../../common/dto/pagination.dto';
import { Role } from '../../enum';
import { ApiError } from '../../filter/api.error';
import { BaseService } from '../../utils/base.service';
import { CommentMService } from './../master/comment/comment.service';
import {
  PartialUpdateReceiptDto,
  ReceiptInformationTblDto,
} from './dto/receipt-information-tbl.dto';
import { SearchReceiptRequestDto } from './dto/search-receipt-tbl.request.dto';
import { ReceiptInformation } from './entities/receipt-information.entity';
import {
  InspectionIncompleteFlagEnum,
  MedicalDPCFlagEnum,
  StatusCheckFlagEnum,
} from './enum';
import { ReceiptInformationRepository } from './receipt-information.repository';
import { ReceiptInformationListDto } from './dto/receipt-information-list.dto';
import { InvokeAsync } from 'src/utils/lambda-utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReceiptInformationService extends BaseService<ReceiptInformation> {
  constructor(
    @InjectRepository(ReceiptInformation)
    private receiptInformationRepo: ReceiptInformationRepository,
    private commentMService: CommentMService,
    private mediaStorage: MediaStorageService,
    private configService: ConfigService,
  ) {
    super(receiptInformationRepo);
  }

  async getReceiptListTbl(
    searchReq: SearchReceiptRequestDto,
    pageOptionsDto: PageOptionsDto,
    authUser?: AccountInfo,
  ) {
    const account_id_not_admin: number =
      parseInt(authUser.account_classification) === Role.ADMIN
        ? null
        : authUser.account_id;
    const itemCount = await this.receiptInformationRepo.countJoinOther(
      searchReq,
      account_id_not_admin ? [account_id_not_admin] : [],
    );
    const entities =
      itemCount > 0
        ? await this.receiptInformationRepo.findJoinOther(
            searchReq,
            pageOptionsDto,
            account_id_not_admin ? [account_id_not_admin] : [],
          )
        : [];
    const data = entities.map((entity) =>
      plainToClass(ReceiptInformationTblDto, entity, {
        excludeExtraneousValues: true,
      }),
    );
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async getAll() {
    return this.receiptInformationRepo.getList();
  }

  async findByUnique(mi_id: number, f_id: number, p_id: number) {
    return this.receiptInformationRepo.find({
      where: {
        mi_id,
        f_id,
        p_id,
      },
    });
  }

  async findByMiIdAndFId(mi_id: number, f_id: number) {
    return this.receiptInformationRepo.find({
      where: {
        mi_id,
        f_id,
      },
    });
  }

  async findByDateOfMedicalTreatment(
    mi_id: number,
    date_of_medical_treatment: Date,
  ) {
    return this.receiptInformationRepo.find({
      where: {
        mi_id,
        date_of_medical_treatment,
      },
    });
  }

  async findByAccountId(account_id: number, mi_id: number, f_id: number) {
    const condition = {
      mi_id,
      f_id,
    };
    if (account_id) condition['account_id'] = account_id;
    return this.receiptInformationRepo.find({
      where: condition,
    });
  }

  async findByAccountIdIn(
    account_ids: number[],
    inspect_start_date?: Date,
    inspect_end_date?: Date,
  ) {
    const conditions = {
      account_id: In(account_ids),
    };
    if (inspect_start_date) {
      conditions['inspection_completion_date'] =
        MoreThanOrEqual(inspect_start_date);
    }
    if (inspect_end_date) {
      conditions['inspection_completion_date'] =
        LessThanOrEqual(inspect_start_date);
    }
    const receipts = await this.receiptInformationRepo.find({
      where: conditions,
    });
    return new Map<number, ReceiptInformation[]>(
      account_ids.map((account_id) => [
        account_id,
        receipts.filter((receipt) => receipt.account_id === account_id),
      ]),
    );
  }

  async saveAll(receipts: ReceiptInformation[]) {
    return this.receiptInformationRepo.save(receipts);
  }

  async getReceiptDetail(receipt_information_id: number) {
    const receiptCurrent = await this.receiptInformationRepo.findOne({
      select: ['medical_dpc_flag'],
      where: {
        id: receipt_information_id,
      },
    });

    if (!receiptCurrent) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'receipt information not found',
      );
    }

    let data = null;
    if (receiptCurrent.medical_dpc_flag === MedicalDPCFlagEnum.MEDICAL) {
      data = await this.receiptInformationRepo.getReceiptDetail(
        receipt_information_id,
      );
    } else {
      data = await this.receiptInformationRepo.getDPCReceiptDetail(
        receipt_information_id,
      );
    }

    let comments = null;
    // convert data TO
    if (data['To']) {
      if (!comments) {
        const reults = await this.commentMService.findAll({
          select: ['number', 'kanji_name'],
        });
        comments = new Map<number, string>(
          reults.map((comment) => [comment.number, comment.kanji_name]),
        );
      }

      for (const item of data['To']) {
        item.comment_1_data = comments.get(item.comment_code_1) ?? '';
        item.comment_2_data = comments.get(item.comment_code_2) ?? '';
        item.comment_3_data = comments.get(item.comment_code_3) ?? '';
      }
    }

    // convert data IY
    if (data['Iy']) {
      if (!comments) {
        const reults = await this.commentMService.findAll({
          select: ['number', 'kanji_name'],
        });
        comments = new Map<number, string>(
          reults.map((comment) => [comment.number, comment.kanji_name]),
        );
      }

      for (const item of data['Iy']) {
        item.comment_1_data = comments.get(item.comment_code_1) ?? '';
        item.comment_2_data = comments.get(item.comment_code_2) ?? '';
        item.comment_3_data = comments.get(item.comment_code_3) ?? '';
      }
    }

    return data;
  }

  async exportPdf(receipt_information_ids: number[], page?: number) {
    const fileName = page
      ? `receipt_detail_${page}_${Date.now()}.pdf`
      : `receipt_detail_${Date.now()}.pdf`;

    const receiptDetails: any[] = await Promise.all(
      receipt_information_ids.map((receipt_information_id: number) =>
        this.getReceiptDetail(receipt_information_id),
      ),
    );

    const generateKo = (Kos: Record<string, any>[]) => {
      function getTitleKo(index: number) {
        switch (index) {
          case 1:
            return '公費 ①';
          case 2:
            return '公費 ②';
          case 3:
            return '公費 ③';
          case 4:
            return '公費 ④';

          default:
            return '';
        }
      }
      const rows = [];
      for (let i = 0; i < 4; i++) {
        const element = Kos[i];
        rows.push({
          title: getTitleKo(i + 1),
          lawOfBurden: element?.bearer_number ?? '-',
          beneficiaryNumber: element?.beneficiary_number ?? '-',
          numberOfDays: element?.actual_days ?? '-',
          points: element?.total_score ?? '-',
          professionalReasons: '',
          burdenAmount: element?.hospital_copayment
            ? `${numberWithCommas(
                element?.hospital_copayment ?? '0000',
              )}${'円'}`
            : '-',
        });
      }
      return rows;
    };

    const dataTemplates = receiptDetails.map((receiptDetail: any) => {
      const re =
        receiptDetail?.Re?.find(
          (e) => +e?.receipt_type === +receiptDetail.receipt_type,
        ) ?? {};

      const sy = receiptDetail?.Sy?.map((sy: any) => ({
        ...sy,
        treatment_start_date: convertStrToFormat(sy?.treatment_start_date),
        memo: sy?.memo ?? '',
      }));

      const error = receiptDetail?.Error?.map((error: any) => ({
        ...error,
        error_contents: error?.error_contents ?? '',
      }))?.filter((e: any) => e);

      const dataTable = [
        {
          title: '主保険',
          lawOfBurden: receiptDetail?.ho_insurer_int ?? '-',
          beneficiaryNumber:
            [
              receiptDetail?.ho_insurance_card_symbol ?? '',
              receiptDetail?.ho_insurance_card_int ?? '',
            ]
              .filter((e) => e)
              .join(',') || '-',
          numberOfDays:
            receiptDetail?.ho_actual_days_of_medical_treatment ?? '-',
          points: receiptDetail?.ho_total_score ?? '-',
          professionalReasons: receiptDetail?.professional_reasons ?? '-',
          burdenAmount: `${numberWithCommas(
            receiptDetail?.ho_medical_insurance ?? '0000',
          )}${'円'}`,
        },
        ...generateKo(receiptDetail?.Ko ?? []),
      ];

      const dataError1_20: string[] = Array.from(
        { length: 20 },
        (_, i) => receiptDetail?.[`error${i + 1}`] ?? '',
      ).filter((e) => e);

      return {
        ...receiptDetail,
        return_destination: ReturnDestinations.find(
          (e) => e.value === receiptDetail.return_destination,
        ).label,
        status_check_flag: StatusCheckFlags.find(
          (e) => e.value === receiptDetail.status_check_flag,
        ).label,
        re: {
          ...re,
          dateOfBirth: `${convertStrToFormat(
            re?.date_of_birth,
          )}${' '}${calculateAge(
            re?.date_of_birth,
            re?.date_of_medical_treatment,
          )}${'歳'}${' '}${getGenderClassification(re?.gender_classification)}`,
          medical_treatment_month: `${convertStrToFormat(
            re?.date_of_medical_treatment,
            APP_YEAR_MONTH_FORMAT,
          )}`,
        },
        payerType: receiptDetail?.Jd?.map((jd: any) => jd.payer_type)?.join(
          ',',
        ),
        calculateDays: calculateDays(receiptDetail?.Jd?.[0] ?? null),
        dataTable,
        dataError1_20,
        Sy: sy,
        Error: error ?? [],
        To: receiptDetail?.To ?? [],
        Iy: receiptDetail?.Iy ?? [],
        Co: receiptDetail?.Co ?? [],
      };
    });

    return this.mediaStorage.generatePdfWithPromise(
      TEMPLATE_KEY.RECEIPT_DETAIL,
      { receipt_details: dataTemplates },
      fileName,
      PAGE_FORMAT.A3,
    );
  }

  async getReceiptListByDelivery(
    receiptInformationListDto: ReceiptInformationListDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const itemCount =
      await this.receiptInformationRepo.countReceiptListByDelivery(
        receiptInformationListDto,
      );
    const content = await this.receiptInformationRepo.getReceiptListByDelivery(
      receiptInformationListDto,
      pageOptionsDto,
    );
    return new PageDto(content, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async patchUpdate(
    receipt_information_id: number,
    partialUpdateReceipt: PartialUpdateReceiptDto,
  ) {
    if (
      partialUpdateReceipt.status_check_flag ===
        StatusCheckFlagEnum.NOT_IMPLEMENTED ||
      partialUpdateReceipt.status_check_flag === StatusCheckFlagEnum.PENDING
    ) {
      partialUpdateReceipt.inspection_completion_date = null;
      partialUpdateReceipt.inspection_incomplete_flag =
        InspectionIncompleteFlagEnum.NOT_COMPLETED;
      partialUpdateReceipt.inspection_time = null;
    }
    return this.update(receipt_information_id, partialUpdateReceipt);
  }

  async exportZip() {
    const allReceiptIds = await this.getAll();
    const receiptIds = allReceiptIds.map((rc) => rc.id);

    if (!receiptIds.length) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Receipt not found');
    }

    const zipName = `receiptZip-${Date.now()}.zip`;
    const dataExportProccess = {
      receiptIds,
      zipName,
    };

    await InvokeAsync(
      process.env.PROCCESS_EXPORT_ZIP_FUNCTION_NAME,
      dataExportProccess,
      this.configService.get<string>('functionInvokeKey.process_export_zip'),
    );

    return zipName;
  }

  async exportAllReceipt(receiptIds: number[], zipName: string) {
    const receiptsWithFolder = [];
    const batchSize = Number(process.env.BATCH_SIZE);

    const linkPdfPromises: any[] = [];
    let page = 0;
    while (receiptIds.length) {
      page++;
      const chunk = receiptIds.splice(0, batchSize);
      linkPdfPromises.push(this.exportPdf(chunk, page));
    }

    const linkPdfs = await Promise.all(linkPdfPromises);

    for (let pdf of linkPdfs) {
      if (pdf) {
        receiptsWithFolder.push({
          name: pdf.filename.trim(),
          folder: 'zips',
        });
      }
    }

    return this.mediaStorage.zipFile(zipName, receiptsWithFolder);
  }
}
