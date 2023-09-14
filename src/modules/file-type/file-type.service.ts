import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileTypeContentEnum } from '../../enum/file-type.enum';
import { BaseService } from '../../utils/base.service';
import { FileType } from './entities/file-type.entity';
import { FileDeliveryEnum } from './enum/file-delivery.enum';
import { FileTypeRepository } from './file-type.repository';

@Injectable()
export class FileTypeService extends BaseService<FileType> {
  constructor(
    @InjectRepository(FileType)
    private fileTypeRepo: FileTypeRepository,
  ) {
    super(fileTypeRepo);
  }

  saveHistory(fileTypeEnum: FileTypeContentEnum) {
    return this.fileTypeRepo.save({
      content: fileTypeEnum,
      is_delivery: FileDeliveryEnum.NO,
      created_date: new Date(),
      updated_date: new Date(),
    });
  }
}
