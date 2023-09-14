import { Module } from '@nestjs/common';
import { DeliveryFileLinkService } from './delivery-file-link.service';
import { DeliveryFileLinkController } from './delivery-file-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryFileLink } from './delivery-file-link.entity';
import { DeliveryFileLinkRepository } from './delivery-file-link.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryFileLinkRepository])],
  controllers: [DeliveryFileLinkController],
  providers: [DeliveryFileLinkService],
  exports: [DeliveryFileLinkService],
})
export class DeliveryFileLinkModule {}
