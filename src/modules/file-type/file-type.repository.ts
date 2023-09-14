import { EntityRepository, Repository } from 'typeorm';
import { FileType } from './entities/file-type.entity';

@EntityRepository(FileType)
export class FileTypeRepository extends Repository<FileType> {}
