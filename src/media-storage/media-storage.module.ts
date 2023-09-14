import { Module } from '@nestjs/common';
import { MediaStorageService } from './media-storage.service';
import { MediaStorageController } from './media-storage.controller';

@Module({
  providers: [MediaStorageService],
  controllers: [MediaStorageController],
  exports: [MediaStorageService],
})
export class MediaStorageModule {}
