import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupLinkRepository } from './group-link.repository';
import { GroupLinkService } from './group-link.service';
import { GroupLinkController } from './group-link.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GroupLinkRepository])],
  providers: [GroupLinkService],
  controllers: [GroupLinkController],
  exports: [GroupLinkService],
})
export class GroupLinkModule {}
