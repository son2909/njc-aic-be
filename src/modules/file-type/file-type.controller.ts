import { Controller } from '@nestjs/common';
import { FileTypeService } from './file-type.service';

@Controller('file-type')
export class FileTypeController {
  constructor(private readonly fileTypeService: FileTypeService) {}
}
