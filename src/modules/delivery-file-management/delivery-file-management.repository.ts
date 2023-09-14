import { EntityRepository, In, Repository, getManager } from 'typeorm';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { Order } from '../../enum';
import { Account } from '../accounts/accounts.entity';
import { MedicalInstitution } from '../medical-institution/entities/medical-institution.entity';
import {
  FilterOption,
  SearchReceiptRequestDto,
} from '../receipt-information/dto/search-receipt-tbl.request.dto';
import { ReceiptInformation } from '../receipt-information/entities/receipt-information.entity';
import { DeliveryFileManagement } from './delivery-file-management.entity';
import { SearchReceiptHopistalRequestDto } from './dto/search-reciept-hopistal.request.dto';

@EntityRepository(DeliveryFileManagement)
export class DeliveryFileManagementRepository extends Repository<DeliveryFileManagement> {
  async findByGroup(account_id?: number) {
    const qb = this.createQueryBuilder('dfmt')
      .select('dfmt.id', 'delivery_file_id')
      .addSelect('dfmt.mi_id', 'mi_id')
      .addSelect('dfmt.upload_date', 'date_of_medical_treatment')
      .leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = dfmt.mi_id')
      .addSelect('mim.medical_institution_name', 'medical_institution_name')
      .innerJoin(
        ReceiptInformation,
        'rit',
        `(rit.mi_id = dfmt.mi_id AND rit.f_id = dfmt.file_id ${
          account_id ? `AND rit.account_id = ${account_id}` : ''
        })`,
      )
      .addSelect(
        `JSON_ARRAYAGG(
              JSON_OBJECT(
                'receipt_information_id', rit.id,
                'mi_id', rit.mi_id ,
                'date_of_medical_treatment', rit.date_of_medical_treatment ,
                'data_received_date', rit.data_received_date,
                'status_check_flag', rit.status_check_flag ,
                'delivery_deadline', rit.delivery_deadline,
                'group_id', rit.group_id,
                'inspection_incomplete_flag', rit.inspection_incomplete_flag,
                'inspection_incomplete_date', rit.inspection_completion_date
              )
            ) receipt_information`,
      );
    Array.from(Array(15).keys()).forEach((e) => {
      qb.addSelect(`dfmt.completion_flag${e + 1}`, `completion_flag${e + 1}`)
        .addSelect(`dfmt.completion_date${e + 1}`, `completion_date${e + 1}`)
        .addSelect(
          `dfmt.allocation_number${e + 1}`,
          `allocation_number${e + 1}`,
        )
        .addSelect(`dfmt.account_id${e + 1}`, `account_id${e + 1}`);
    });
    if (account_id) {
      Array.from(Array(15).keys()).forEach((e) => {
        qb.orWhere(`dfmt.account_id${e + 1} = :account_id`, {
          account_id: account_id,
        });
      });
      qb.orWhere('rit.account_id = :account_id', { account_id: account_id });
      // const condition = Array.from(Array(15).keys()).map((e) =>
      //   JSON.parse(`{"dfmt.account_id${e + 1}":  ${account_id}}`),
      // );
      // condition.push({ 'ric.account_id': account_id });
      // qb.where(condition);
    }
    qb.groupBy('dfmt.id');
    return qb.getRawMany();
  }

  async findByDistributed(pageOpt: PageOptionsDto) {
    let sql_total_allocation = '(';
    Array.from(Array(15).keys()).forEach((e) => {
      sql_total_allocation = sql_total_allocation.concat(
        `coalesce(dfmt.allocation_number${e + 1}, 0) + `,
      );
    });
    sql_total_allocation = sql_total_allocation.concat('0)');
    const qb = this.createQueryBuilder('dfmt')
      .select(
        `dfmt.id delivery_file_id, 
        dfmt.upload_date upload_date, 
        mim.medical_institution_name medical_institution_name,
        ${sql_total_allocation} total_allocation,
        SUM(rit.account_id IS NOT NULL) total_assign,
        SUM(rit.account_id IS NULL) total_not_assign,
        COUNT(rit.id) total_receipt`,
      )
      .leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = dfmt.mi_id')
      .leftJoin(
        ReceiptInformation,
        'rit',
        '(rit.mi_id = dfmt.mi_id AND rit.f_id = dfmt.file_id)',
      )
      .groupBy('dfmt.id')
      .orderBy({
        'dfmt.created_date': Order.DESC,
      })
      .offset(pageOpt.page - 1)
      .limit(pageOpt.limit);
    return qb.getRawMany();
  }

  async getDelivery(pageOpt: PageOptionsDto) {
    let sql_total_allocation = 'case when completion_flag1 = 2';
    Array.from(Array(14).keys()).forEach((e) => {
      sql_total_allocation = sql_total_allocation.concat(
        ` and completion_flag${e + 2} = 2`,
      );
    });
    const qb = this.createQueryBuilder('dfmt')
      .select('dfmt.id', 'delivery_file_id')
      .addSelect('mim.medical_institution_name', 'medical_institution_name')
      .addSelect('dfmt.upload_date', 'upload_date')
      .addSelect(`${sql_total_allocation} then 2 else 1 end`, 'process_status')
      .addSelect('dfmt.upload_date')
      .addSelect('dfmt.completion_date15', 'completion_date')
      .addSelect('dfmt.delivery_status', 'delivery_status')
      .leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = dfmt.mi_id')
      .orderBy({
        'dfmt.created_date': Order.DESC,
      })
      .offset(pageOpt.page - 1)
      .limit(pageOpt.limit);
    return qb.getRawMany();
  }

  async getInfoInvoice(delivery_ids) {
    const query = this.createQueryBuilder('dfmt')
      .select([
        'rit.delivery_deadline as delivery_deadline',
        "CONCAT(amt.first_name, ' ', amt.given_name) AS name",
        'amt.unit_price AS price',
        'COUNT(rit.id) AS quantity',
        'amt.unit_price * COUNT(rit.id) AS total_price',
        'dfmt.file_id as file_id',
        'dfmt.mi_id as mi_id',
      ])
      .leftJoin(Account, 'amt', 'dfmt.account_id = amt.account_id')
      .leftJoin(
        ReceiptInformation,
        'rit',
        'dfmt.mi_id = rit.mi_id and rit.f_id = dfmt.file_id',
      )
      .where('dfmt.id IN (:delivery_ids)', {
        delivery_ids,
      })
      .groupBy(
        'dfmt.id, amt.account_id, rit.mi_id, rit.account_id, rit.delivery_deadline',
      );

    return await query.getRawMany();
  }

  async searchHospital(
    payload: SearchReceiptHopistalRequestDto,
    pageOpt: PageOptionsDto,
  ) {
    return await this.buildQuerySearchHospital(payload)
      .offset(pageOpt.page - 1)
      .limit(pageOpt.limit)
      .getRawMany();
  }

  async countSearchHospital(payload: SearchReceiptHopistalRequestDto) {
    return await this.buildQuerySearchHospital(payload).getCount();
  }

  buildQuerySearchHospital(payload: SearchReceiptHopistalRequestDto) {
    const qb = this.createQueryBuilder('dfmt')
      .select('dfmt.id')
      .addSelect('amt.mi_id')
      .addSelect('mim.medical_institution_name ')
      .addSelect('rit.date_of_medical_treatment')
      .addSelect('dfmt.total_number')
      .addSelect(
        'sum(case when rit.acknowledgment_flag = 1 and rit.error_flag = 1 then 1 else 0 end) ',
        'total_update',
      )
      .addSelect('rit.data_received_date')
      .addSelect('delivery_completion_date', 'delivery_completion_date')
      .leftJoin(Account, 'amt', 'dfmt.account_id = amt.account_id')
      .leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = dfmt.mi_id')
      .leftJoin(
        ReceiptInformation,
        'rit',
        '(rit.mi_id = dfmt.mi_id AND rit.f_id = dfmt.file_id)',
      )
      .where('1=1');
    if (payload.medical_code) {
      qb.where('amt.mi_id like :medical_code', {
        medical_code: `%${payload.medical_code}%`,
      });
    }
    if (payload.medical_name) {
      qb.where('mim.medical_institution_name like :medical_name', {
        medical_name: `%${payload.medical_name}%`,
      });
    }
    qb.groupBy(
      'dfmt.id,rit.date_of_medical_treatment ,rit.data_received_date,rit.delivery_completion_date ',
    ).orderBy({
      'dfmt.created_date': Order.DESC,
    });
    return qb;
  }

  async findJoinOther(
    searchReq: SearchReceiptRequestDto,
    pageOpt: PageOptionsDto,
  ) {
    const qb = this.buildSql();
    const conditions = this.getConditionsJoinOther(searchReq.filter);
    qb.andWhere(conditions);
    this.andKeyword(qb, searchReq.keyword);
    qb.orderBy(this.getOrderByJoinOther(searchReq.filter))
      .offset(pageOpt.skip)
      .limit(pageOpt.limit);
    return qb.getRawMany();
  }

  async countJoinOther(searchReq: SearchReceiptRequestDto): Promise<number> {
    const qb = this.buildSql();
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
    order['created_date'] = Order.DESC;
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

  buildSql() {
    const qb = getManager()
      .createQueryBuilder(DeliveryFileManagement, 'dfmt')
      .select('dfmt.id', 'receipt_information_id')
      .addSelect('dfmt.file_id', 'file_id')
      .addSelect('dfmt.file_name', 'file_name')
      .addSelect('dfmt.mi_id', 'mi_id')
      .addSelect('dfmt.file_type', 'file_type')
      .addSelect('dfmt.upload_date', 'upload_date')
      .addSelect('dfmt.account_id', 'account_id')
      .addSelect('dfmt.total_number', 'total_number')
      .addSelect('dfmt.sorting_status_flag', 'sorting_status_flag')
      .addSelect('dfmt.delivery_status', 'delivery_status')
      .addSelect('dfmt.updated_date', 'updated_date')
      .addSelect('dfmt.created_date', 'created_date');
    Array.from(Array(15).keys()).forEach((e) => {
      qb.addSelect(`dfmt.account_id${e + 1}`, `account_id${e + 1}`)
        .addSelect(
          `dfmt.allocation_number${e + 1}`,
          `allocation_number${e + 1}`,
        )
        .addSelect(`dfmt.completion_flag${e + 1}`, `completion_flag${e + 1}`)
        .addSelect(`dfmt.completion_date${e + 1}`, `completion_date${e + 1}`);
    });
    qb.leftJoin(MedicalInstitution, 'mim', 'mim.mi_id = dfmt.mi_id').leftJoin(
      Account,
      'amt',
      'amt.account_id = dfmt.account_id',
    );
    return qb;
  }

  andKeyword(qb: any, key_word?: string) {
    if (key_word) {
      qb.andWhere(
        `mim.medical_institution_name LIKE :key_word 
      OR amt.nickname LIKE :key_word 
      OR dfmt.file_name LIKE :key_word`,
        { key_word: `%${key_word}%` },
      );
    }
  }

  async findListInProcess(ids: number[]) {
    let sql_inprogress = '(completion_flag1 <> 2 ';
    Array.from(Array(14).keys()).forEach((e) => {
      sql_inprogress = sql_inprogress.concat(
        ` or completion_flag${e + 2} <>  2`,
      );
    });
    sql_inprogress = sql_inprogress.concat(')');
    return this.createQueryBuilder('dfmt')
      .select('dfmt.id', 'id')
      .where('id in (:ids)', { ids })
      .andWhere(sql_inprogress)
      .getCount();
  }

  async updateFromStatusDelivery(delivery_id: number) {
    getManager().query(
      'update ' +
        '  receipt_information_t rit ' +
        'inner join delivery_file_management_t dfmt on ' +
        '  rit.mi_id = dfmt.mi_id ' +
        '  and rit.f_id = dfmt.file_id   ' +
        'set ' +
        '  delayed_delivery_flag = case ' +
        "    when DATE_FORMAT(SYSDATE(), '%Y-%m-%d') > delivery_deadline then 2 " +
        '    else 1 ' +
        '  end , ' +
        '  inspection_incomplete_flag = case ' +
        "    when DATE_FORMAT(SYSDATE(), '%Y-%m-%d') > delivery_deadline " +
        '    and inspection_incomplete_flag is null then 2 ' +
        '    else 1 ' +
        '  end ' +
        'where dfmt.id = ?',
      [delivery_id],
    );
  }
}
