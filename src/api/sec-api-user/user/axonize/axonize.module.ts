import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxonizeUserController } from './axonize.controller';
import { ClientUserService } from '../clientUser.service';

@Module({
  imports: [HttpModule],
  controllers: [AxonizeUserController],
  providers: [ClientUserService],
})
export class AxonizeModule {}
