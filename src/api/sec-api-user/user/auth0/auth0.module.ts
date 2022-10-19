import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Auth0Service } from './auth0.service';
import { Auth0UserController } from './auth0.controller';
import { Auth0AuthenticateController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [HttpModule],
  controllers: [Auth0UserController, Auth0AuthenticateController],
  providers: [Auth0Service, AuthenticationService],
})
export class Auth0Module {}
