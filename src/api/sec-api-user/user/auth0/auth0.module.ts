import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Auth0UserController } from './auth0.controller';
import { ClientUserService } from '../clientUser.service';

@Module({
  imports: [HttpModule],
  controllers: [Auth0UserController],
  providers: [ClientUserService],
})
export class Auth0Module {}
