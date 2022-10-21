import { Controller, Request, All, Put, } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClientUserService } from '../clientUser.service';
import { UserController } from '../user.controller';

@ApiBearerAuth()
@ApiTags('SSA School')
@Controller('ssa-school')
// @UseGuards(AuthorizationGuard) // comment to bypass authentication for local testing
export class SsaSchoolController implements UserController {
  constructor(private readonly clientUserService: ClientUserService) {}
  @All(['', '/unblock/:id', '/:id'])
  async all(@Request() req: Request) {
    return this.clientUserService.request(req);
  }
}
