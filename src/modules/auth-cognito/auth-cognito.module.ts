import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../accounts/accounts.module';
import { AccountRepository } from '../accounts/accounts.repository';
import { AccountService } from '../accounts/accounts.service';
import { AuthCognitoNewController } from './auth-cognito-new.controller';
import { AuthCognitoNewService } from './auth-cognito-new.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
    forwardRef(() => AccountModule),
  ],
  controllers: [AuthCognitoNewController],
  providers: [AuthCognitoNewService, AccountService],
  exports: [AuthCognitoNewService],
})
export class AuthCognitoModule {}
