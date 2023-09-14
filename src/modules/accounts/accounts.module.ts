import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCognitoNewService } from '../auth-cognito/auth-cognito-new.service';
import { AuthCognitoModule } from '../auth-cognito/auth-cognito.module';
import { RolesGuard } from '../auth-cognito/guards/roles.guard';
import { AccountController } from './accounts.controller';
import { AccountRepository } from './accounts.repository';
import { AccountService } from './accounts.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecretKey'),
        signOptions: {
          expiresIn: configService.get<string>('jwtExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => AuthCognitoModule),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccountService,
    AuthCognitoNewService,
  ],
  controllers: [AccountController],
  exports: [TypeOrmModule, AccountService, AuthCognitoNewService],
})
export class AccountModule {}
