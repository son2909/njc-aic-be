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
import { AccountInfo } from '../../common/account-info';
import { PageOptionsDto } from '../../common/dto/pagination-options.dto';
import { AuthUser } from '../../decorators/auth.user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enum';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ProposalPoint } from './dto/enum/proposal-point.enum';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { ProposalService } from './proposal.service';

@ApiTags('proposal')
@ApiBearerAuth()
@Controller('proposals')
@Roles([Role.ADMIN, Role.CHECKER])
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get()
  async findAllAndPaging(
    @Query() pageOptionsDto: PageOptionsDto,
    @AuthUser() authUser?: AccountInfo,
  ) {
    return this.proposalService.findAllAndPaging(pageOptionsDto, authUser);
  }

  @Post()
  @ApiBody({
    type: CreateProposalDto,
  })
  async create(
    @Body() createProposalDto: CreateProposalDto,
    @AuthUser() authUser?: AccountInfo,
  ) {
    return this.proposalService.create(createProposalDto, authUser);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateProposalDto,
  })
  async update(
    @Param('id') proposalId: number,
    @Body() updateProposalDto: UpdateProposalDto,
    @AuthUser() authUser?: AccountInfo,
  ) {
    return this.proposalService.edit(proposalId, updateProposalDto, authUser);
  }

  @Get(':id')
  async getById(@Param('id') proposalId: number) {
    return this.proposalService.getById(proposalId);
  }

  @Delete(':id')
  async delete(@Param('id') proposalId: number) {
    return this.proposalService.deleteById(proposalId);
  }

  @Get(':id/like')
  async like(
    @Param('id') proposalId: number,
    @AuthUser() authUser?: AccountInfo,
  ) {
    return this.proposalService.updatePoint(
      proposalId,
      ProposalPoint.LIKE,
      authUser,
    );
  }

  @Get(':id/unlike')
  async unlike(
    @Param('id') proposalId: number,
    @AuthUser() authUser?: AccountInfo,
  ) {
    return this.proposalService.updatePoint(
      proposalId,
      ProposalPoint.UNLIKE,
      authUser,
    );
  }
}
