import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../utils/base.service';
import { CommentM } from './comment.entity';
import { CommentMRepository } from './comment.repository';

@Injectable()
export class CommentMService extends BaseService<CommentM> {
  constructor(
    @InjectRepository(CommentM)
    private readonly commentMRepository: CommentMRepository,
  ) {
    super(commentMRepository);
  }
}
