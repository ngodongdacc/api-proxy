import { Controller, All, Request } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientUserService } from '../clientUser.service';

@ApiTags('Axonize')
@Controller('')
@ApiBearerAuth('token')
@ApiBasicAuth('axonize_api_token')
export class AxonizeUserController {
  constructor(private readonly clientUserService: ClientUserService) {}
  @All(['', '/all', 'apiKey', 'resetPassword', '/:id'])
  async all(@Request() req: Request) {
    return this.clientUserService.request(req);
  }
}
