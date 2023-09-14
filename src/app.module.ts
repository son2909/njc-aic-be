import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import { envFilePaths } from './constant';
import { DatabaseModule } from './database/database.module';
import { AllExceptionFilter } from './filter/exception.filter';
import { LoggerModule } from './logger/logger.module';
import { MediaStorageModule } from './media-storage/media-storage.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AccountModule } from './modules/accounts/accounts.module';
import { AccountRepository } from './modules/accounts/accounts.repository';
import { AlertModule } from './modules/alert/alert.module';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { AppraisalInformationModule } from './modules/appraisal-information/appraisal-information.module';
import { AuthCognitoModule } from './modules/auth-cognito/auth-cognito.module';
import { ThrottlerBehindProxyGuard } from './modules/auth-cognito/guards/throttler-proxy.guard';
import { ChatGroupModule } from './modules/chat-group/chat-group.module';
import { ExternalModule } from './modules/external/external.module';
import { FileEvaluateModule } from './modules/file-evaluate/file-evaluate.module';
import { FileManagementModule } from './modules/file-management/file-management.module';
import { FileTypeModule } from './modules/file-type/file-type.module';
import { GroupLinkModule } from './modules/group-link/group-link.module';
import { GroupManagementModule } from './modules/group-management/group-management.module';
import { MasterModule } from './modules/master/master.module';
import { MedicalInstitutionModule } from './modules/medical-institution/medical-institution.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { ReceiptInformationModule } from './modules/receipt-information/receipt-information.module';
import { UkeModule } from './modules/uke/uke-import.module';
import { WorkexecutionHistoryModule } from './modules/workexecution_history/workexecution_history.module';
import { ValidatorModule } from './validators/validator.module';
import { ReceiptDistributionSettingModule } from './modules/receipt-distribution-setting/receipt-distribution-setting.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { RemoteStaffModule } from './modules/remote-staff/remote-staff.module';
import { AppraisalConditionSettingModule } from './modules/appraisal-condition-setting/appraisal-condition-setting.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { DeliveryFileLinkModule } from './modules/delivery-file-link/delivery-file-link.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePaths,
      load: [appConfig, databaseConfig, authConfig],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('throttleTtl'),
        limit: config.get<number>('throttleLimit'),
      }),
    }),
    TypeOrmModule.forFeature([AccountRepository]),
    LoggerModule,
    ValidatorModule,
    DatabaseModule,
    MediaStorageModule,
    AuthCognitoModule,
    ChatGroupModule,
    AnnouncementModule,
    AccountModule,
    GroupManagementModule,
    GroupLinkModule,
    ProposalModule,
    MedicalInstitutionModule,
    ExternalModule,
    FileManagementModule,
    FileTypeModule,
    AlertModule,
    MasterModule,
    UkeModule,
    ReceiptInformationModule,
    AppraisalInformationModule,
    FileEvaluateModule,
    ReceiptDistributionSettingModule,
    CalendarModule,
    WorkexecutionHistoryModule,
    RemoteStaffModule,
    AppraisalConditionSettingModule,
    InvoiceModule,
    DeliveryFileLinkModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '(.*)auth(.*)', method: RequestMethod.ALL },
        { path: '(.*)mfa/adminDisableMFA(.*)', method: RequestMethod.ALL },
        { path: '(.*)external(.*)', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
