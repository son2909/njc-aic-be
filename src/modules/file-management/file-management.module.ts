import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTypeModule } from '../file-type/file-type.module';
import { FileManagementController } from './file-management.controller';
import { FileManagementRepository } from './file-management.repository';
import { FileManagementService } from './file-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileManagementRepository]),
    FileTypeModule,
  ],
  controllers: [FileManagementController],
  providers: [FileManagementService],
  exports: [FileManagementService],
})
export class FileManagementModule {}
