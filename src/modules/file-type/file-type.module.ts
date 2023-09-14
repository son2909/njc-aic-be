import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTypeController } from './file-type.controller';
import { FileTypeRepository } from './file-type.repository';
import { FileTypeService } from './file-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileTypeRepository])],
  controllers: [FileTypeController],
  providers: [FileTypeService],
  exports: [FileTypeService],
})
export class FileTypeModule {}
