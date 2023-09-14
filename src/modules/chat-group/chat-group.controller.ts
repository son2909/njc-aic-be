import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { ChatGroupService } from './chat-group.service';
import { ChatManagementDto } from './dto';
import {} from './dto';
@ApiTags('chatgroup')
@ApiBearerAuth()
@Controller('chatgroup')
export class ChatGroupController {
  constructor(private readonly chatGroupService: ChatGroupService) {}

  @Post('/chat-management')
  async getListMessageFromGroup(
    @Body() chatManagementDto: PageOptionsDto<ChatManagementDto>,
  ) {
    return this.chatGroupService.getListMessageFromGroup(chatManagementDto);
  }
}
