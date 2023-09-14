import { PartialType } from '@nestjs/swagger';
import { CreateFileManagementDto } from '../../../media-storage/dto/file-import.dto';

export class UpdateFileManagementDto extends PartialType(
  CreateFileManagementDto,
) {}
