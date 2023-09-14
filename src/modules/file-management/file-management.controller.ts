import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import { FileManagementService } from './file-management.service';

@ApiTags('file-management')
@ApiBearerAuth()
@Roles([Role.ADMIN, Role.CLIENT])
@Controller('file-management')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}

  @Get()
  async findPaging(@Query() pageable: PageOptionsDto) {
    return this.fileManagementService.findPaging(pageable);
  }
}
