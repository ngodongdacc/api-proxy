import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expressjwt: jwt } = require('express-jwt');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;
  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );
    try {
      await checkJwt(req, res);
      req.token = this.getToken(req);
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }

  getToken(request: Request): string {
    const header = request.header('Authorization');
    if (header) {
      return header.replace(/^Bearer /, '').trim();
    }
    return '';
  }
}
