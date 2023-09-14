import { CommentM } from './comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentM)
export class CommentMRepository extends Repository<CommentM> {}
