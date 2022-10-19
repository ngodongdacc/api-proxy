import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
})
export class ConfigModule {}
