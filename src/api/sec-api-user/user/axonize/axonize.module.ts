import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxonizeService } from './axonize.service';
import { AxonizeUserController } from './axonize.controller';

@Module({
  imports: [HttpModule],
  controllers: [AxonizeUserController],
  providers: [AxonizeService],
})
export class AxonizeModule {}
