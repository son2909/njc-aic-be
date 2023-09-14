import { PaymentFundMedicalDepartmentModule } from './../master/payment-fund-medical-department/payment-fund-medical-department.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupManagementModule } from '../group-management/group-management.module';
import { ReceiptInformationController } from './receipt-information.controller';
import { ReceiptInformationRepository } from './receipt-information.repository';
import { ReceiptInformationService } from './receipt-information.service';
import { CommentMModule } from '../master/comment/comment.module';
import { MediaStorageService } from 'src/media-storage/media-storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceiptInformationRepository]),
    GroupManagementModule,
    CommentMModule,
  ],
  controllers: [ReceiptInformationController],
  providers: [ReceiptInformationService, MediaStorageService],
  exports: [ReceiptInformationService, MediaStorageService],
})
export class ReceiptInformationModule {}
