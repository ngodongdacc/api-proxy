import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AllUserController } from './all-user/ssa-school.controller';
import { ClientUserService } from './clientUser.service';
import { SsaSchoolController } from './ssa-school/ssa-school.controller';

@Module({
  imports: [HttpModule],
  controllers: [SsaSchoolController, AllUserController],
  providers: [ClientUserService],
})
export class UserModule { }
