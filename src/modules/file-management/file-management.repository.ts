import { EntityRepository, Repository, getManager } from 'typeorm';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { Order } from '../../enum';
import { FileType } from '../file-type/entities/file-type.entity';
import { MedicalInstitution } from '../medical-institution/entities/medical-institution.entity';
import { FileManagement } from './entities/file-management.entity';
import { MedicalDPCFlagEnum } from '../receipt-information/enum';

@EntityRepository(FileManagement)
export class FileManagementRepository extends Repository<FileManagement> {
  async itemCount(): Promise<number> {
    return this.buildQueryPaging().getCount();
  }

  async listPaging(pageable: PageOptionsDto) {
    const qb = this.buildQueryPaging()
      .orderBy('file_management.created_date', Order.DESC)
      .skip(pageable.skip)
      .take(pageable.limit);
    return qb.getRawMany();
  }

  buildQueryPaging() {
    return getManager()
      .createQueryBuilder(FileManagement, 'file_management')
      .select('file_management.file_id', 'file_id')
      .addSelect('file_management.file_name', 'file_name')
      .addSelect('file_management.mi_id', 'mi_id')
      .addSelect('file_management.file_division', 'file_division')
      .addSelect('file_management.file_type_id', 'file_type_id')
      .addSelect('file_management.total_number', 'total_number')
      .addSelect('file_management.upload_date', 'upload_date')
      .addSelect('file_management.created_date', 'created_date')
      .leftJoin(
        MedicalInstitution,
        'medical',
        'file_management.mi_id = medical.mi_id',
      )
      .addSelect('medical.medical_institution_name', 'mi_name')
      .leftJoin(
        FileType,
        'ft',
        'ft.file_type_id = file_management.file_type_id',
      )
      .addSelect('ft.content', 'file_type_name');
  }

  findRecordsThisMonth(request_id: string, request_type: MedicalDPCFlagEnum) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const qb = this.createQueryBuilder('fmt')
      .select(
        `
        fmt.file_id AS f_id,
        fmt.file_type_id AS file_type_id
        `,
      )
      .where(
        'MONTH(fmt.created_date) = :month AND YEAR(fmt.created_date) = :year AND (fmt.request_id <> :request_id OR fmt.request_id IS NULL) AND fmt.request_type = :request_type',
        {
          month: currentMonth,
          year: currentYear,
          request_id,
          request_type,
        },
      );

    return qb.getRawMany();
  }
}
