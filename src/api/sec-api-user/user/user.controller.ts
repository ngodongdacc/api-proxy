import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserController {
  abstract all(req: Request): Promise<any>;
}
