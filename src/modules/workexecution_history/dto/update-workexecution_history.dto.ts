import { PartialType } from '@nestjs/swagger';
import { CreateWorkexecutionHistoryDto } from './create-workexecution_history.dto';

export class UpdateWorkexecutionHistoryDto extends PartialType(
  CreateWorkexecutionHistoryDto,
) {}
