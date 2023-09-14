import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentMRepository } from './comment.repository';
import { CommentMService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentMRepository])],
  providers: [CommentMService],
  exports: [CommentMService],
})
export class CommentMModule {}
