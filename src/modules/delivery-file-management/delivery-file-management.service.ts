import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import moment from 'moment';
// import PdfPrinter, { TFontDictionary } from 'pdfmake';
import { dateToNumberFormat } from 'src/utils/helper';
import { PageMetaDto } from '../../common/dto/pagination-meta.dto';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { PageDto } from '../../common/dto/pagination.dto';
import { Role } from '../../enum';
import { ApiError } from '../../filter/api.error';
import { MediaStorageService } from '../../media-storage/media-storage.service';
import { BaseService } from '../../utils/base.service';
import { DeliveryFileLink } from '../delivery-file-link/delivery-file-link.entity';
import { DeliveryFileLinkService } from '../delivery-file-link/delivery-file-link.service';
import { Invoice } from '../invoice/invoice.entity';
import { InvoiceService } from '../invoice/invoice.service';
import { ReceiptDistributionSettingService } from '../receipt-distribution-setting/receipt-distribution-setting.service';
import { ReceiptInformationGrDto } from '../receipt-information/dto/receipt-information-gr.dto';
import { SearchReceiptRequestDto } from '../receipt-information/dto/search-receipt-tbl.request.dto';
import {
  InspectionIncompleteFlagEnum,
  StatusCheckFlagEnum,
} from '../receipt-information/enum';
import { ReceiptInformationService } from '../receipt-information/receipt-information.service';
import { AccountInfo } from './../../common/account-info';
import { DeliverySetting } from './builder/delivery-setting.builder';
import { DeliveryFileManagement } from './delivery-file-management.entity';
import { DeliveryFileManagementRepository } from './delivery-file-management.repository';
import { DeliveryDistributedReceiptDto } from './dto/delivery-distributed-receipt.dto';
import { DeliveryDistributedDto } from './dto/delivery-distributed.dto';
import { DeliveryFileManagementDto } from './dto/delivery.dto';
import { ExportInvoiceDto } from './dto/response/delivery-export-invoice.dto copy';
import { InvoiceDto } from './dto/response/invoice.dto';
import { SearchReceiptHopistalRequestDto } from './dto/search-reciept-hopistal.request.dto';
import { UpdateCompleteFlagDto } from './dto/update-complete-flag.dto';
import { UpdateStatusDeliveryDto } from './dto/update-status-delivery.dto';
import {
  CompletionFlag,
  DeliveryStatusEnum,
  SortingStatusFlagEnum,
} from './enum/delivery-file-management.enum';
import { PAGE_FORMAT, TEMPLATE_KEY } from '../../constant';

@Injectable()
export class DeliveryFileManagementService extends BaseService<DeliveryFileManagement> {
  constructor(
    @InjectRepository(DeliveryFileManagement)
    private readonly deliveryFileManagementRepository: DeliveryFileManagementRepository,
    private readonly receiptService: ReceiptInformationService,
    private readonly receiptSettingService: ReceiptDistributionSettingService,
    private readonly mediaStorageService: MediaStorageService,
    private readonly invoiceService: InvoiceService,
    private readonly deliveryFileLinkService: DeliveryFileLinkService,
  ) {
    super(deliveryFileManagementRepository);
  }

  async findByAccountId(account_id: number) {
    return this.deliveryFileManagementRepository.find({
      where: {
        account_id,
      },
    });
  }

  async findByGroup(account_id?: number) {
    return this.deliveryFileManagementRepository.findByGroup(account_id);
  }

  async getReceiptListGroup(
    authUser?: AccountInfo,
  ): Promise<ReceiptInformationGrDto[]> {
    const account_id =
      parseInt(authUser.account_classification) === Role.ADMIN
        ? null
        : authUser.account_id;
    const data = await this.findByGroup(account_id);
    if (data.length) {
      this.setCompleteFlag(data, account_id);
    }
    const result = data.map((e) => {
      const receipt_gr = plainToClass(ReceiptInformationGrDto, e, {
        excludeExtraneousValues: true,
      });
      if (e.receipt_information && e.receipt_information.length) {
        receipt_gr.date_of_medical_treatment =
          e.receipt_information[0].date_of_medical_treatment;
        receipt_gr.receipt_information_id =
          e.receipt_information[0].receipt_information_id;
        receipt_gr.mi_id = e.receipt_information[0].mi_id;
        receipt_gr.data_received_date =
          e.receipt_information[0].data_received_date;
        receipt_gr.delivery_deadline =
          e.receipt_information[0].delivery_deadline;
        receipt_gr.group_id = e.receipt_information[0].group_id;
        receipt_gr.count_status_check_flag = e.receipt_information.length;
        receipt_gr.count_status_check_flag_pending =
          e.receipt_information.filter(
            (ee) => ee.status_check_flag === StatusCheckFlagEnum.PENDING,
          ).length;
        receipt_gr.count_status_check_flag_done = e.receipt_information.filter(
          (ee) => ee.status_check_flag === StatusCheckFlagEnum.IMPLEMENTED,
        ).length;
        receipt_gr.count_status_check_flag_processing =
          e.receipt_information.filter(
            (ee) =>
              ee.status_check_flag === StatusCheckFlagEnum.NOT_IMPLEMENTED,
          ).length;
        if (receipt_gr.count_status_check_flag_processing) {
          receipt_gr.status_check_flag = StatusCheckFlagEnum.NOT_IMPLEMENTED;
        } else if (receipt_gr.count_status_check_flag_pending) {
          receipt_gr.status_check_flag = StatusCheckFlagEnum.PENDING;
        } else {
          receipt_gr.status_check_flag = StatusCheckFlagEnum.IMPLEMENTED;
        }
      }
      return receipt_gr;
    });
    return result;
  }

  setCompleteFlag(data: any[], account_id?: number) {
    // not admin
    if (account_id) {
      data.forEach((e) => {
        const key = this.getAccountNumber(e, account_id);
        if (key) {
          e['account_number'] = Number(key);
          e['completion_date'] = e[`completion_date${key}`];
          e['completion_flag'] = e[`completion_flag${key}`];
        } else {
          // TODO: set completion field when success
          e['account_number'] = null;
          e['completion_date'] = this.isAllReceiptComplete(
            e.receipt_information,
          );
          CompletionFlag.YES;
          e['completion_flag'] = !!e.completion_date
            ? CompletionFlag.YES
            : CompletionFlag.NO;
        }
      });
    } else {
      data.forEach((e) => {
        const completionFlag = this.isYesAllCompletionFlag(e)
          ? CompletionFlag.YES
          : CompletionFlag.NO;
        e['account_number'] = null;
        e['completion_flag'] = completionFlag;
        if (CompletionFlag.YES === completionFlag) {
          e['completion_date'] = e['completion_date1'];
        } else {
          e['completion_date'] = null;
        }
      });
    }
  }

  isYesAllCompletionFlag(element_data: any) {
    const index = Array.from(Array(15).keys()).findIndex(
      (e) =>
        !element_data[`completion_flag${e + 1}`] ||
        element_data[`completion_flag${e + 1}`] === CompletionFlag.NO,
    );
    return index === -1;
  }

  isAllReceiptComplete(receipts: any[]) {
    if (
      receipts.filter(
        (e) =>
          e.inspection_incomplete_flag ===
          InspectionIncompleteFlagEnum.COMPLETED,
      ).length === receipts.length
    ) {
      return receipts[0].inspection_incomplete_date;
    }
    return null;
  }

  getAccountNumber(element_data: any, account_id: number) {
    return Object.keys(element_data)
      .filter((key) => key.startsWith('account_id') && key !== 'account_id')
      .find((key) => account_id === element_data[key]);
  }

  async updateCompletionFlag(
    delivery_id: number,
    request: UpdateCompleteFlagDto,
    authUser?: AccountInfo,
  ) {
    const delivery = await this.findById(delivery_id);
    if (!delivery)
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Delivery not exist');
    //TODO: CHECK ADMIN
    const account_id =
      parseInt(authUser.account_classification) === Role.ADMIN
        ? null
        : authUser.account_id;
    // admin
    const completion_date =
      CompletionFlag.YES === request.completion_flag ? new Date() : null;
    if (!account_id) {
      Array.from(Array(15).keys()).forEach((index) => {
        delivery[`completion_flag${index + 1}`] = request.completion_flag;
        delivery[`completion_date${index + 1}`] = completion_date;
      });
    } else {
      Array.from(Array(15).keys()).forEach((index) => {
        if (delivery[`account_id${index + 1}`] === account_id) {
          delivery[`completion_flag${index + 1}`] = request.completion_flag;
          delivery[`completion_date${index + 1}`] = completion_date;
        }
      });
    }

    delivery.updated_date = new Date();
    await this.deliveryFileManagementRepository.save(delivery);

    // update all receipt
    const receipts = await this.receiptService.findByAccountId(
      account_id,
      delivery.mi_id,
      delivery.file_id,
    );
    const statusFlagUpdate =
      CompletionFlag.YES === request.completion_flag
        ? StatusCheckFlagEnum.IMPLEMENTED
        : StatusCheckFlagEnum.NOT_IMPLEMENTED;
    receipts.forEach((e) => {
      e.status_check_flag = statusFlagUpdate;
      e.update_date = new Date();
      if (statusFlagUpdate == StatusCheckFlagEnum.IMPLEMENTED) {
        e.inspection_completion_date = new Date();
        e.inspection_incomplete_flag = InspectionIncompleteFlagEnum.COMPLETED;
        e.inspection_time = dateToNumberFormat(
          e.inspection_completion_date,
          'HHmmss',
        );
      } else {
        e.inspection_completion_date = null;
        e.inspection_incomplete_flag =
          InspectionIncompleteFlagEnum.NOT_COMPLETED;
        e.inspection_time = null;
      }
    });
    this.receiptService.bulkInsert(receipts, 'id', [
      'status_check_flag',
      'update_date',
      'inspection_completion_date',
      'inspection_incomplete_flag',
    ]);
    return delivery;
  }

  async findByDistributed(pageOptionsDto: PageOptionsDto) {
    const itemCount = await this.deliveryFileManagementRepository.count();
    const content =
      await this.deliveryFileManagementRepository.findByDistributed(
        pageOptionsDto,
      );
    const data = content.map((e) => {
      const result = plainToClass(DeliveryDistributedDto, e, {
        excludeExtraneousValues: true,
      });
      return result;
    });
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async distributed(delivery_id: number) {
    const delivery = await this.findById(delivery_id);
    if (!delivery)
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Delivery not exist');
    const receipts = await this.receiptService.findByMiIdAndFId(
      delivery.mi_id,
      delivery.file_id,
    );
    const settings = await this.receiptSettingService.findAllCustom();
    let receiptUpdate = [];
    let account_number = 1;
    settings.forEach((setting, index) => {
      let receiptValids = DeliverySetting.builder(receipts)
        .mi_id(setting.mi_id)
        .p_id(setting.p_id)
        .medicalAndDental(setting.medical_and_dental)
        .inpatientOutpatient(setting.inpatient_outpatient)
        .socialInsuranceNational(setting.social_insurance_national_insurance)
        .clinicalDepartment(setting.clinical_department)
        .errorFlag(setting.presence_or_absence_of_errors)
        .belowScore(setting.flag_below_the_score)
        .moreScore(setting.more_than_the_corresponding_score_flag)
        .build();
      if (receiptValids.length) {
        delivery[`account_id${account_number}`] = setting.account_id;
        delivery[`allocation_number${account_number}`] = receiptValids.length;
        receiptValids.forEach((re) => {
          re.account_id = setting.account_id;
          re.update_date = new Date();
        });
        receiptUpdate = receiptUpdate.concat(receiptValids);
        account_number++;
      }
    });
    delivery.sorting_status_flag = SortingStatusFlagEnum.ALLOCATED;
    delivery.updated_date = new Date();
    await this.deliveryFileManagementRepository.save(delivery);
    if (receiptUpdate.length) {
      this.receiptService.bulkInsert(receiptUpdate, 'id', [
        'account_id',
        'update_date',
      ]);
    }
    return plainToClass(DeliveryFileManagementDto, delivery, {
      excludeExtraneousValues: true,
    });
  }

  async distributedReceipt(request: DeliveryDistributedReceiptDto) {
    const receipts = await this.receiptService.findByIds(request.receipt_ids);
    if (receipts.length !== request.receipt_ids.length)
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Receipt not exist');
    receipts.forEach((re) => {
      re.account_id = request.account_id;
      re.update_date = new Date();
    });
    await this.receiptService.saveAll(receipts);
    return receipts.length;
  }

  async searchHospital(
    payload: SearchReceiptHopistalRequestDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const itemCount =
      await this.deliveryFileManagementRepository.countSearchHospital(payload);
    const content = await this.deliveryFileManagementRepository.searchHospital(
      payload,
      pageOptionsDto,
    );
    return new PageDto(content, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async getListDelivery(pageOptionsDto: PageOptionsDto) {
    const itemCount = await this.deliveryFileManagementRepository.count();
    const content = await this.deliveryFileManagementRepository.getDelivery(
      pageOptionsDto,
    );
    return new PageDto(content, new PageMetaDto({ itemCount, pageOptionsDto }));
  }

  async updateStatusDelivery(
    updateStatusDeliveryDto: UpdateStatusDeliveryDto,
  ): Promise<any> {
    if (
      DeliveryStatusEnum.DELIVERED == updateStatusDeliveryDto.operation_code
    ) {
      const countInprocess =
        await this.deliveryFileManagementRepository.findListInProcess(
          updateStatusDeliveryDto.ids,
        );
      if (countInprocess)
        throw new ApiError(
          HttpStatus.BAD_REQUEST,
          'Delivery not completion process',
        );
    }
    for (const id of updateStatusDeliveryDto.ids) {
      await this.deliveryFileManagementRepository.update(
        { id },
        { delivery_status: updateStatusDeliveryDto.operation_code },
      );
      await this.deliveryFileManagementRepository.updateFromStatusDelivery(id);
    }
  }

  async getInvoiceInfo(delivery_ids: number[]) {
    const invoice = new InvoiceDto();
    invoice.item = await this.deliveryFileManagementRepository.getInfoInvoice(
      delivery_ids,
    );
    invoice.item.forEach((item) => {
      invoice.total_price += +item.total_price;
      invoice.tax += +item.total_price / 10;
      invoice.total_price_tax += +item.total_price + +item.total_price / 10;
      invoice.name = item.name;
      invoice.file_id = item.file_id;
      invoice.mi_id = item.mi_id;
    });
    return invoice;
  }

  async generatePDF(req: ExportInvoiceDto): Promise<any> {
    const invoice = await this.getInvoiceInfo(req.ids);
    invoice.item.forEach(
      (e) =>
        (e.delivery_deadline_str = `診療報酬明細書点検業務 ${moment(
          e.delivery_deadline,
        ).format('YYYY年MM月DD日')} 受領分`),
    );
    let invoiceT = new Invoice();
    invoiceT.mi_id = invoice.mi_id;
    invoiceT.upload_date = new Date();
    invoiceT = await this.invoiceService.store(invoiceT);
    let deliveryLink = new DeliveryFileLink();
    deliveryLink.mi_id = invoiceT.mi_id;
    deliveryLink.invoice_id = invoiceT.invoice_id;
    deliveryLink.file_id = invoice.file_id;
    await this.deliveryFileLinkService.store(deliveryLink);
    return this.mediaStorageService.generatePdfWithPromise(
      TEMPLATE_KEY.INVOICE,
      {
        invoice: {
          ...invoice,
          note: req.note,
          range: `${moment(req.date)
            .startOf('month')
            .format('YYYY-MM-DD')} ~ ${moment(req.date)
            .endOf('month')
            .format('YYYY-MM-DD')}  `,
          addressRow1: process.env.INVOICE_ADDRESS_ROW_1,
          addressRow2: process.env.INVOICE_ADDRESS_ROW_2,
          addressRow3: process.env.INVOICE_ADDRESS_ROW_3,
          addressRow4: process.env.INVOICE_ADDRESS_ROW_4,
          bank: process.env.INVOICE_BANK,
          account: process.env.INVOICE_ACCOUNT,
        },
      },
      'invoice.pdf',
      PAGE_FORMAT.A4,
    );
    // const fonts: TFontDictionary = {
    //   Roboto: {
    //     normal: 'src/font/jp/NotoSansJP-VariableFont_wght.ttf',
    //     bold: 'src/font/jp/NotoSansJP-Black.ttf',
    //     italics: 'src/font/jp/NotoSansJP-Black.ttf',
    //     bolditalics: 'src/font/jp/NotoSansJP-Black.ttf',
    //   },
    // };
    // const printer = new PdfPrinter(fonts);
    // const invoice = await this.getInvoiceInfo(req.ids);
    //   {
    //     text: `診療報酬明細書点検業務 ${moment(e.delivery_deadline).format(
    //       'YYYY年MM月DD日',
    //     )} 受領分`,
    //     border: [true, true, true, true],
    //   },
    //   { text: e.price, border: [true, true, true, true] },
    //   { text: e.quantity, border: [true, true, true, true] },
    //   { text: e.total_price, border: [true, true, true, true] },
    //   {
    //     text: '',
    //     style: 'tableHeader',
    //     border: [true, true, true, true],
    //   },
    // ]);
    // if (dataInvoice) dataInvoice[0][4].text = req.note ? req.note : '';
    // const dataBlank = [];
    // for (let index = 0; index < 10 - invoice.item.length; index++) {
    //   dataBlank.push([
    //     {
    //       text: '',
    //       border: [true, true, true, true],
    //     },
    //     { text: '', border: [true, true, true, true] },
    //     { text: '', border: [true, true, true, true] },
    //     { text: '', border: [true, true, true, true] },
    //     {
    //       text: '',
    //       style: 'tableHeader',
    //       border: [true, true, true, true],
    //     },
    //   ]);
    // }
    // const docDefinition = {
    //   content: [
    //     {
    //       style: 'tableExample',
    //       table: {
    //         widths: ['50%', '50%'],
    //         body: [
    //           [
    //             {
    //               text: '〒',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '請　　求　　書',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: `${invoice.name} 様`,
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, true],
    //             },
    //           ],
    //           [
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '〒',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //               margin: [0, 20, 0, 0],
    //             },
    //           ],
    //           [
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '株式会社エヌジェーシー',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: 'aaa',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: 'TEL:',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: '対象期間',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: `${moment(req.date)
    //                 .startOf('month')
    //                 .format('YYYY-MM-DD')} ~ ${moment(req.date)
    //                 .endOf('month')
    //                 .format('YYYY-MM-DD')}  `,
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: '平素は格別のお引き立てを賜り厚く御礼申し上げます。',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //               margin: [0, 20, 0, 0],
    //             },
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: '下記の通りご請求申し上げます。',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //           [
    //             {
    //               text: `ご請求金額：￥${invoice.total_price_tax}。`,
    //               margin: [0, 20, 0, 0],
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             {
    //               text: '',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //           ],
    //         ],
    //       },
    //       layout: {
    //         hLineStyle: function (i, node) {
    //           return { dash: { length: 5, space: 4 } };
    //         },
    //       },
    //     },
    //     {
    //       style: 'tableExample',
    //       table: {
    //         widths: ['30%', '20%', '5%', '19%', '26%'],
    //         heights: 20,
    //         body: [
    //           [
    //             {
    //               text: '項目',
    //               style: 'tableHeader',
    //               border: [true, true, true, true],
    //             },
    //             {
    //               text: '単価',
    //               style: 'tableHeader',
    //               border: [true, true, true, true],
    //             },
    //             {
    //               text: '数量',
    //               style: 'tableHeader',
    //               border: [true, true, true, true],
    //             },
    //             {
    //               text: '金額（税抜）',
    //               style: 'tableHeader',
    //               border: [true, true, true, true],
    //             },
    //             {
    //               text: '備考）',
    //               style: 'tableHeader',
    //               border: [true, true, true, true],
    //             },
    //           ],
    //           ...dataInvoice,
    //           ...dataBlank,
    //         ],
    //       },
    //     },
    //     {
    //       style: 'tableExample',
    //       table: {
    //         widths: ['50%', '25%', '25%'],
    //         body: [
    //           [
    //             { text: '【振込先】', border: [false, false, false, false] },
    //             { text: '小計', border: [true, false, true, true] },
    //             {
    //               text: `￥${invoice.total_price}`,
    //               border: [true, false, true, true],
    //             },
    //           ],
    //           [
    //             { text: '金融機関名：', border: [false, false, false, false] },
    //             { text: '消費税', border: [true, true, true, true] },
    //             { text: `￥${invoice.tax}`, border: [true, true, true, true] },
    //           ],
    //           [
    //             { text: '名義人　　：', border: [false, false, false, false] },
    //             {
    //               text: '合計金額',
    //               border: [true, true, true, true],
    //             },
    //             {
    //               text: `￥ ${invoice.total_price_tax}`,
    //               style: 'tableHeader',
    //               border: [true, true, true, true],
    //             },
    //           ],
    //           [
    //             {
    //               text: '※振込手数料はご負担願います。',
    //               style: 'tableHeader',
    //               border: [false, false, false, false],
    //             },
    //             { text: '', border: [false, false, false, false] },
    //             { text: '', border: [false, false, false, false] },
    //           ],
    //         ],
    //       },
    //     },
    //   ],
    //   defaultStyle: {
    //     font: 'Roboto',
    //   },
    // };
    // const options = {};
    // let file_name = 'invoice.pdf';
    // const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    // pdfDoc.pipe(fs.createWriteStream(file_name));
    // pdfDoc.end();
    // const s3ObjectInfo =
    //   await this.mediaStorageService.uploadBufferToS3DynamicType(
    //     pdfDoc,
    //     file_name,
    //   );
    // let invoiceT = new Invoice();
    // invoiceT.mi_id = invoice.mi_id;
    // invoiceT.upload_date = new Date();
    // invoiceT = await this.invoiceService.store(invoiceT);
    // let deliveryLink = new DeliveryFileLink();
    // deliveryLink.mi_id = invoiceT.mi_id;
    // deliveryLink.invoice_id = invoiceT.invoice_id;
    // deliveryLink.file_id = invoice.file_id;
    // await this.deliveryFileLinkService.store(deliveryLink);
    // return this.mediaStorageService.signedGetObject(
    //   s3ObjectInfo.Key,
    //   file_name,
    //   true,
    //   null,
    // );
  }

  async getDeliveryListTbl(
    searchReq: SearchReceiptRequestDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const itemCount =
      await this.deliveryFileManagementRepository.countJoinOther(searchReq);
    const data = await this.deliveryFileManagementRepository.findJoinOther(
      searchReq,
      pageOptionsDto,
    );
    return new PageDto(data, new PageMetaDto({ itemCount, pageOptionsDto }));
  }
}
