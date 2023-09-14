import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordConfirmValidator } from './password-confirm.validator';

@Global()
@Module({
  imports: [
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
  ],
  providers: [PasswordConfirmValidator],
  exports: [PasswordConfirmValidator],
})
export class ValidatorModule {}
