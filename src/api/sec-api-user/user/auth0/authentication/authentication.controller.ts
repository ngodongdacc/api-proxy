import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuth0 } from '../dto/login-auth0.dto';
import { AuthenticationService } from './authentication.service';

@ApiTags('Auth0')
@Controller()
export class Auth0AuthenticateController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() req: LoginAuth0) {
    const result = await this.authenticationService.loginUserHandler(req);
    if (result.error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: result,
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return result;
    }
  }
}
