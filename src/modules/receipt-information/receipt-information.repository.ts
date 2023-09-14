import { ClassConstructor } from 'class-transformer';
import { EntityRepository, In, Repository, getManager } from 'typeorm';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { Order } from '../../enum';
import { getPropertiesEntity } from '../../utils/helper';
import { Account } from '../accounts/accounts.entity';
import { DeliveryFileManagement } from '../delivery-file-management/delivery-file-management.entity';
import { MedicalDepartment } from '../master/medical-department/medical-department.entity';
import { MedicalPractice } from '../master/medical-practice/entities/medical-practice.entity';
import { Modifier } from '../master/modifier/entities/modifier.entity';
import { PharmaceuticalM } from '../master/pharmaceutical/pharmaceutical.entity';
import { SpecificEquipmentM } from '../master/specific-equipment/specific-equipment.entity';
import { MedicalInstitution } from '../medical-institution/entities/medical-institution.entity';
import { CO } from '../uke/CO/CO.entity';
import { D_CO } from '../uke/DPC/D_CO/D_CO.entity';
import { D_GO } from '../uke/DPC/D_GO/D_GO.entity';
import { D_HO } from '../uke/DPC/D_HO/D_HO.entity';
import { D_IR } from '../uke/DPC/D_IR/D_IR.entity';
import { D_IY } from '../uke/DPC/D_IY/D_IY.entity';
import { D_JD } from '../uke/DPC/D_JD/D_JD.entity';
import { D_KO } from '../uke/DPC/D_KO/D_KO.entity';
import { D_RE } from '../uke/DPC/D_RE/D_RE.entity';
import { D_SI } from '../uke/DPC/D_SI/D_SI.entity';
import { D_SJ } from '../uke/DPC/D_SJ/D_SJ.entity';
import { D_SY } from '../uke/DPC/D_SY/D_SY.entity';
import { D_TO } from '../uke/DPC/D_TO/D_TO.entity';
import { DpcError } from '../uke/DPC/dpc_error/dpc-error.enitty';
import { GO } from '../uke/GO/GO.entity';
import { IY } from '../uke/IY/IY.entity';
import { JD } from '../uke/JD/JD.entity';
import { RE } from '../uke/RE/RE.entity';
import { SI } from '../uke/SI/SI.entity';
import { SJ } from '../uke/SJ/SJ.entity';
import { SY } from '../uke/SY/SY.entity';
import { TO } from '../uke/TO/TO.entity';
import { ErrorT } from '../uke/error/error.entity';
import { UkeCodeConversion } from '../uke/uke-code-conversion/uke-code-conversion.entity';
import { InjuryName } from './../master/injury-name/entities/injury-name.entity';
import { HO } from './../uke/HO/HO.entity';
import { IR } from './../uke/IR/IR.entity';
import { KO } from './../uke/KO/KO.entity';
import {
  FilterOption,
  SearchReceiptRequestDto,
} from './dto/search-receipt-tbl.request.dto';
import { ReceiptInformation } from './entities/receipt-information.entity';
import { ReceiptInformationListDto } from './dto/receipt-information-list.dto';

@EntityRepository(ReceiptInformation)
export class ReceiptInformationRepository extends Repository<ReceiptInformation> {
  async findJoinOther(
    searchReq: SearchReceiptRequestDto,
    pageOpt: PageOptionsDto,
    account_ids: number[] = [],
  ) {
    const qb = this.buildSql();
    if (account_ids.length) {
      qb.andWhere({
        account_id: In(account_ids),
      });
    }
    const conditions = this.getConditionsJoinOther(searchReq.filter);
    qb.andWhere(conditions);
    this.andKeyword(qb, searchReq.keyword);
    qb.orderBy(this.getOrderByJoinOther(searchReq.filter))
      .offset(pageOpt.skip)
      .limit(pageOpt.limit);
    return qb.getRawMany();
  }

  async getList() {
    return this.buildSql().select('rit.id as id').getRawMany();
  }

  async countJoinOther(
    searchReq: SearchReceiptRequestDto,
    account_ids: number[] = [],
  ) {
    const qb = this.buildSql();
    if (account_ids.length) {
      qb.andWhere({
        account_id: In(account_ids),
      });
    }
    const conditions = this.getConditionsJoinOther(searchReq.filter);
    qb.andWhere(conditions);
    this.andKeyword(qb, searchReq.keyword);
    return qb.getCount();
  }

  getOrderByJoinOther(filter: FilterOption[]) {
    const order = {};
    if (filter?.length) {
      filter
        .filter((f) => !!f.order)
        .forEach((f) => {
          order[`${f.key}`] = Order[f.order];
        });
    }
    order['rit.created_date'] = Order.DESC;
    return order;
  }

  getConditionsJoinOther(filter: FilterOption[]) {
    const where = {};
    if (filter?.length) {
      filter
        .filter((f) => !!f.value && !!f.value.length)
        .forEach((f) => {
          where[`${f.key}`] = In(f.value);
        });
    }
    return where;
  }

  async getReceiptListByDelivery(
    receiptInformationListDto: ReceiptInformationListDto,
    pageOpt: PageOptionsDto,
  ) {
    if (receiptInformationListDto.isAll)
      return await this.buildSqlGetReceiptListByDelivery(
        receiptInformationListDto,
      ).getRawMany();
    return await this.buildSqlGetReceiptListByDelivery(
      receiptInformationListDto,
    )
      .offset(pageOpt.skip)
      .limit(pageOpt.limit)
      .getRawMany();
  }

  async countReceiptListByDelivery(
    receiptInformationListDto: ReceiptInformationListDto,
  ) {
    return await this.buildSqlGetReceiptListByDelivery(
      receiptInformationListDto,
    ).getCount();
  }

  buildSqlGetReceiptListByDelivery(
    receiptInformationListDto: ReceiptInformationListDto,
  ) {
    let query = this.createQueryBuilder('rit')
      .select('rit.id', 'id')
      .addSelect('p_id')
      .addSelect(
        'case when medical_dental_flag = 1 then "医科" else "歯科" end medical_dental_flag',
      )
      .addSelect(
        'case when inpatient_outpatient_flag = 1 then "入院"  else "外来" end inpatient_outpatient_flag',
      )
      .addSelect('date_of_medical_treatment')
      .addSelect(
        'case when social_national_flag = 1 then "社保" else "国保" end social_national_flag',
      )
      .addSelect('clinical_department')
      .addSelect('doctor_name')
      .addSelect('total_score')
      .addSelect(
        'case when acknowledgment_flag =  1 then "指摘あり"  else "指摘なし" end acknowledgment_flag',
      )
      .addSelect(
        'case when error_flag = 1 then "エラーあり" else "エラーなし" end error_flag',
      )
      .addSelect(
        'case when print_status_flag = 1 then "済み" else "未実施" end print_status_flag',
      )
      .addSelect('rit.return_destination', 'return_destination')
      .leftJoin(Account, 'amt', 'rit.account_id = amt.account_id')
      .leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = rit.mi_id')
      .leftJoin(
        DeliveryFileManagement,
        'dfmt',
        '(rit.mi_id = dfmt.mi_id and rit.f_id = dfmt.file_id)',
      )
      .where('dfmt.id = :delivery_id', {
        delivery_id: receiptInformationListDto.delivery_id,
      });
    if (receiptInformationListDto.return_destination) {
      query.andWhere('rit.return_destination = :return_destination', {
        return_destination: receiptInformationListDto.return_destination,
      });
    }
    return query.orderBy({
      'dfmt.created_date': Order.DESC,
    });
  }

  buildSql() {
    const qb = getManager()
      .createQueryBuilder(ReceiptInformation, 'rit')
      .select('rit.id', 'receipt_information_id')
      .addSelect('rit.status_check_flag', 'status_check_flag')
      .addSelect('rit.mi_id', 'mi_id')
      .addSelect('rit.p_id', 'patient_id')
      .addSelect('rit.date_of_medical_treatment', 'date_of_medical_treatment')
      .addSelect('rit.medical_dental_flag', 'medical_dental_flag')
      .addSelect('rit.inpatient_outpatient_flag', 'inpatient_outpatient_flag')
      .addSelect('rit.social_national_flag', 'social_national_flag')
      .addSelect('rit.clinical_department', 'clinical_department')
      .addSelect('rit.total_score', 'total_score')
      .addSelect('rit.error_flag', 'error_flag')
      .addSelect('rit.acknowledgment_flag', 'acknowledgment_flag')
      .addSelect('rit.note_contents', 'note_contents')
      .addSelect('rit.account_id', 'account_id')
      .addSelect('rit.receipt_type', 'receipt_type')
      .leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = rit.mi_id')
      .addSelect('mim.medical_institution_name', 'medical_institution_name')
      .leftJoin(Account, 'amt', 'amt.account_id = rit.account_id')
      .addSelect('amt.nickname', 'account_username')
      .leftJoin(MedicalDepartment, 'mdm', 'mdm.code = rit.clinical_department')
      .addSelect('mdm.content', 'clinical_department_name');
    return qb;
  }

  andKeyword(qb: any, key_word?: string) {
    if (key_word) {
      qb.andWhere(
        `mim.medical_institution_name LIKE :key_word 
      OR amt.nickname LIKE :key_word 
      OR mdm.content LIKE :key_word 
      OR rit.note_contents LIKE :key_word`,
        { key_word: `%${key_word}%` },
      );
    }
  }

  createSubquery(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subQuerySy(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'update_date'],
  ) {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'basic_name', injury.basic_name`)
          .concat(`'outcome_category_name', ucc.content`)
          .concat(`'modifer_name', modifier.name`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        InjuryName,
        'injury',
        'injury.injury_name_code = related.injury_name_code',
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc',
        'ucc.code = related.outcome_category AND ucc.main_code = 113',
      )
      .leftJoin(Modifier, 'modifier', 'modifier.code = related.modifier_code')
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subquerySi(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'medical_practice_name', medicalPractice.abbreviated_kanji`)
          .concat(`'data_standard_code_name', ucc.content`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        MedicalPractice,
        'medicalPractice',
        `medicalPractice.medical_practice_code = related.medical_practice_code`,
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc',
        'ucc.code = medicalPractice.data_standard_code AND ucc.main_code = 116',
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subqueryTo(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'specified_equipment_name', SpecificEquipmentM.kanji_name_1`)
          .concat(`'unit_code_name', ucc.content`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        SpecificEquipmentM,
        'SpecificEquipmentM',
        `SpecificEquipmentM.specified_equipment_code = related.specified_equipment_code`,
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc',
        'ucc.code = related.unit_code AND ucc.main_code = 116',
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subqueryIy(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'drug_name', PharmaceuticalM.kanji_name_1`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        PharmaceuticalM,
        'PharmaceuticalM',
        `PharmaceuticalM.drug_code = related.drug_code`,
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subqueryJd(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'payer_name', ucc.content`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc',
        "ucc.code = related.payer_type AND ucc.main_code = 120 AND ucc.code_name = '負担者種別コード'",
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subqueryRe(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'department_name_1', ucc.content`)
          .concat(`'receiptsn_content', ucc1.content`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc',
        'ucc.code = related.dname1 AND ucc.main_code = 106',
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc1',
        'ucc1.code = related.receiptsn AND ucc1.main_code = 105',
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  subqueryD_Re(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    ignoreColumns: string[] = ['p_id', 'f_id', 'mi_id', 'id', 'update_date'],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${getPropertiesEntity(relatedEntity)
          .filter((column) => !ignoreColumns.includes(column))
          .map((column) => `'${column}', related.${column}`)
          .concat(`'department_name_1', ucc.content`)
          .concat(`'receiptsn_content', ucc1.content`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.f_id AND related.mi_id = rit.mi_id AND related.p_id = rit.p_id`,
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc',
        'ucc.code = related.department_name AND ucc.main_code = 106',
      )
      .leftJoin(
        UkeCodeConversion,
        'ucc1',
        'ucc1.code = related.receipt_special_notes AND ucc1.main_code = 105',
      )
      .where('rit.id = :receiptId', { receiptId })
      .groupBy('rit.mi_id, rit.f_id, rit.p_id');

    return subquery.getQuery();
  }

  createSubqueryError<T>(
    receiptId: number,
    relatedEntity: ClassConstructor<unknown>,
    columnSelects: string[],
  ): string {
    const subquery = this.createQueryBuilder('rit')
      .select(
        `JSON_ARRAYAGG(JSON_OBJECT(${columnSelects
          .map((column) => `'${column}', related.${column}`)
          .join(', ')}))`,
        `json`,
      )
      .innerJoin(
        relatedEntity,
        'related',
        `related.f_id = rit.error_f_id AND rit.p_id = CAST(related.medical_record_number AS SIGNED) AND related.error_contents IS NOT NULL`,
      )
      .where('rit.id = :receiptId', { receiptId });

    return subquery.getQuery();
  }

  async getReceiptDetail(receipt_information_id: number) {
    const subqueryJd = this.subqueryJd(receipt_information_id, JD);
    const subqueryKo = this.createSubquery(receipt_information_id, KO);
    const subquerySy = this.subQuerySy(receipt_information_id, SY);
    const subquerySi = this.subquerySi(receipt_information_id, SI);
    const subqueryIy = this.subqueryIy(receipt_information_id, IY);
    const subqueryTo = this.subqueryTo(receipt_information_id, TO);
    const subqueryRe = this.subqueryRe(receipt_information_id, RE);
    const subquerySj = this.createSubquery(receipt_information_id, SJ);
    const subqueryCo = this.createSubquery(receipt_information_id, CO);
    const subqueryGo = this.createSubquery(receipt_information_id, GO);
    const subqueryError = this.createSubqueryError(
      receipt_information_id,
      ErrorT,
      [
        'error_contents',
        'error_code',
        'target_code',
        'target_code_name',
        'id',
        'error_contents_update',
      ],
    );

    const qb = this.createQueryBuilder('rit')
      .select('rit.id', 'id')
      .addSelect('rit.*')
      .addSelect('ht.id', 'ho_id')
      .addSelect('( ' + subqueryRe + ')', 'Re')
      .addSelect('( ' + subqueryKo + ')', 'Ko')
      .addSelect('( ' + subqueryJd + ')', 'Jd')
      .addSelect('( ' + subquerySy + ')', 'Sy')
      .addSelect('( ' + subquerySi + ')', 'Si')
      .addSelect('( ' + subqueryIy + ')', 'Iy')
      .addSelect('( ' + subqueryTo + ')', 'To')
      .addSelect('( ' + subqueryCo + ')', 'Co')
      .addSelect('( ' + subquerySj + ')', 'Sj')
      .addSelect('( ' + subqueryGo + ')', 'Go')
      .addSelect('( ' + subqueryError + ')', 'Error')
      .innerJoin(IR, 'it', 'it.f_id = rit.f_id AND it.mi_id = rit.mi_id')
      .addSelect('it.id', 'ir_id')
      .addSelect('it.medical_institution_code', 'ir_medical_institution_code')
      .addSelect('it.telephone_number', 'ir_telephone_number')
      .leftJoin(
        HO,
        'ht',
        'ht.f_id = rit.f_id AND ht.mi_id = rit.mi_id AND ht.p_id = rit.p_id',
      )
      .addSelect('ht.insurer_int', 'ho_insurer_int')
      .addSelect('ht.insurance_card_symbol', 'ho_insurance_card_symbol')
      .addSelect('ht.insurance_card_int', 'ho_insurance_card_int')
      .addSelect(
        'ht.actual_days_of_medical_treatment',
        'ho_actual_days_of_medical_treatment',
      )
      .addSelect('ht.total_score', 'ho_total_score')
      .addSelect('ht.professional_reasons', 'ho_professional_reasons')
      .addSelect('ht.medical_insurance', 'ho_medical_insurance')
      .addSelect('ht.exemption_category', 'ho_exemption_category')
      .addSelect('ht.reduction_rate', 'ho_reduction_rate')
      .addSelect('ht.reduction_amount', 'ho_reduction_amount')
      .where('rit.id = :receiptId', { receiptId: receipt_information_id });

    return qb.getRawOne();
  }

  async getDPCReceiptDetail(receipt_information_id: number) {
    const subqueryJd = this.subqueryJd(receipt_information_id, D_JD);
    const subqueryKo = this.createSubquery(receipt_information_id, D_KO);
    const subquerySy = this.subQuerySy(receipt_information_id, D_SY);
    const subquerySi = this.subquerySi(receipt_information_id, D_SI);
    const subqueryIy = this.subqueryIy(receipt_information_id, D_IY);
    const subqueryTo = this.subqueryTo(receipt_information_id, D_TO);
    const subqueryRe = this.subqueryD_Re(receipt_information_id, D_RE);
    const subquerySj = this.createSubquery(receipt_information_id, D_SJ);
    const subqueryCo = this.createSubquery(receipt_information_id, D_CO);
    const subqueryGo = this.createSubquery(receipt_information_id, D_GO);
    const subqueryError = this.createSubqueryError(
      receipt_information_id,
      DpcError,
      [
        'error_contents',
        'error_code',
        'target_code',
        'target_code_name',
        'id',
        'error_contents_update',
      ],
    );

    const qb = this.createQueryBuilder('rit')
      .select('rit.id', 'id')
      .addSelect('rit.*')
      .addSelect('ht.id', 'ho_id')
      .addSelect('( ' + subqueryRe + ')', 'Re')
      .addSelect('( ' + subqueryKo + ')', 'Ko')
      .addSelect('( ' + subqueryJd + ')', 'Jd')
      .addSelect('( ' + subquerySy + ')', 'Sy')
      .addSelect('( ' + subquerySi + ')', 'Si')
      .addSelect('( ' + subqueryIy + ')', 'Iy')
      .addSelect('( ' + subqueryTo + ')', 'To')
      .addSelect('( ' + subqueryCo + ')', 'Co')
      .addSelect('( ' + subquerySj + ')', 'Sj')
      .addSelect('( ' + subqueryGo + ')', 'Go')
      .addSelect('( ' + subqueryError + ')', 'Error')
      .innerJoin(D_IR, 'it', 'it.f_id = rit.f_id AND it.mi_id = rit.mi_id')
      .addSelect('it.id', 'ir_id')
      .addSelect('it.medical_institution_code', 'ir_medical_institution_code')
      .addSelect('it.telephone_number', 'ir_telephone_number')
      .leftJoin(
        D_HO,
        'ht',
        'ht.f_id = rit.f_id AND ht.mi_id = rit.mi_id AND ht.p_id = rit.p_id',
      )
      .addSelect('ht.insurer_number', 'ho_insurer_int')
      .addSelect('ht.symbol', 'ho_insurance_card_symbol')
      .addSelect('ht.number', 'ho_insurance_card_int')
      .addSelect(
        'ht.actual_days_of_medical_treatment',
        'ho_actual_days_of_medical_treatment',
      )
      .addSelect('ht.total_score', 'ho_total_score')
      .addSelect('ht.reason', 'ho_professional_reasons')
      .addSelect('ht.medical_insurance', 'ho_medical_insurance')
      .addSelect('ht.exemption_category', 'ho_exemption_category')
      .addSelect('ht.reduction_rate', 'ho_reduction_rate')
      .addSelect('ht.reduction_amount', 'ho_reduction_amount')
      .where('rit.id = :receiptId', { receiptId: receipt_information_id });

    return qb.getRawOne();
  }

  async sumEveryStatusFlag(mi_id: number, file_id: number) {
    const qb = this.createQueryBuilder('rit')
      .select(
        `SUM(rit.status_check_flag = 1) status_flag_implemented, 
         SUM(rit.status_check_flag = 2) status_flag_not_implemented, 
         SUM(rit.status_check_flag = 3) status_flag_pendding`,
      )
      .where('rit.mi_id = :mi_id AND rit.f_id = :file_id', {
        mi_id,
        file_id,
      });
    return qb.getRawOne();
  }
}
