import { AccountService } from './../modules/accounts/accounts.service';
import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ApiError } from '../filter/api.error';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private readonly config: ConfigService;

  @Inject()
  private readonly accountService: AccountService;

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders?.split(' ')[1]) {
      const token = authHeaders.split(' ')[1];
      try {
        const jwtTokenDecoded: any = verify(
          token,
          this.config.get('jwtSecretKey'),
        );
        const curentAccount = await this.accountService.findById(
          jwtTokenDecoded.payload.account_id,
        );
        if (!curentAccount) {
          throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
        }
        req['user'] = curentAccount;
        req['cog_accessToken'] = jwtTokenDecoded.payload.AccessToken;
        next();

        res.on('finish', () => {});
      } catch (error) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
      }
    } else {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }
  }
}
