import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty()
  @IsNotEmpty()
  mi_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 100)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 300)
  proposal_content: string;
}
