import { Controller, All, Request } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientUserService } from '../clientUser.service';

@ApiTags('Auth0')
@Controller('')
@ApiBearerAuth('token')
@ApiBasicAuth('auth0_api_token')
export class Auth0UserController {
  constructor(private readonly clientUserService: ClientUserService) {}
  @All(['', 'login', 'all', 'apikey', '/:id'])
  async all(@Request() req: Request) {
    return this.clientUserService.request(req);
  }
}
