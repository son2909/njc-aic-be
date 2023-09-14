import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FileTypeContentEnum } from '../../../src/enum/file-type.enum';
import { LoggerService } from '../../../src/logger/custom.logger';
import { getConnection } from 'typeorm';
import { PageMetaDto } from '../../common/dto/pagination-meta.dto';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { PageDto } from '../../common/dto/pagination.dto';
import { BaseService } from '../../utils/base.service';
import { FileType } from '../file-type/entities/file-type.entity';
import { FileDeliveryEnum } from '../file-type/enum/file-delivery.enum';
import { FileManagementDto } from './dto/file-management.dto';
import { HistoryFileManagementDto } from './dto/history-file-management.dto';
import { FileManagement } from './entities/file-management.entity';
import { FileManagementRepository } from './file-management.repository';
import { MedicalDPCFlagEnum } from '../receipt-information/enum';

@Injectable()
export class FileManagementService extends BaseService<FileManagement> {
  constructor(
    @InjectRepository(FileManagement)
    private fileRepo: FileManagementRepository,
    private logger: LoggerService,
  ) {
    super(fileRepo);
  }

  async findPaging(
    pageable: PageOptionsDto,
  ): Promise<PageDto<FileManagementDto>> {
    const itemCount = await this.fileRepo.itemCount();
    const entities = await this.fileRepo.listPaging(pageable);
    const data = entities.map((entity) => {
      return plainToClass(FileManagementDto, entity, {
        excludeExtraneousValues: true,
      });
    });
    return new PageDto(
      data,
      new PageMetaDto({ itemCount, pageOptionsDto: pageable }),
    );
  }

  async saveHistory(
    fileTypeEnum: FileTypeContentEnum,
    history: HistoryFileManagementDto,
  ) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const historyToSave = new FileType({
        content: fileTypeEnum,
        is_delivery: FileDeliveryEnum.NO,
        created_date: new Date(),
        updated_date: new Date(),
      });
      const fileType = await queryRunner.manager.save(FileType, historyToSave);
      const fileManagement = plainToClass(FileManagement, history);
      fileManagement.file_type_id = fileType.file_type_id;
      fileManagement.upload_date = new Date();
      fileManagement.created_date = new Date();
      fileManagement.updated_date = new Date();
      const entity = await queryRunner.manager.save(
        FileManagement,
        fileManagement,
      );
      await queryRunner.commitTransaction();
      return entity;
    } catch (error) {
      this.logger.error(error?.message);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  saveHistoryMaster(history: HistoryFileManagementDto) {
    return this.saveHistory(FileTypeContentEnum.MASTER, history);
  }

  saveHistoryUKE(history: HistoryFileManagementDto) {
    return this.saveHistory(FileTypeContentEnum.UKE, history);
  }

  saveHistoryRC(history: HistoryFileManagementDto) {
    return this.saveHistory(FileTypeContentEnum.RC, history);
  }

  saveHistoryEvaluate(history: HistoryFileManagementDto) {
    return this.saveHistory(FileTypeContentEnum.EVALUATE, history);
  }

  findRecordsThisMonth(request_id: string, request_type: MedicalDPCFlagEnum) {
    return this.fileRepo.findRecordsThisMonth(request_id, request_type);
  }
}
