import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Auth0Module } from './api/sec-api-user/user/auth0/auth0.module';
import { AxonizeModule } from './api/sec-api-user/user/axonize/axonize.module';
import { UserModule } from './api/sec-api-user/user/user.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '',
        children: [
          {
            path: '/user',
            module: UserModule,
            children: [
              {
                path: 'axonize',
                module: AxonizeModule,
              },
              {
                path: 'auth0',
                module: Auth0Module,
              },
            ],
          },
        ],
      },
    ]),
    UserModule,
    Auth0Module,
  ],
})
export class RouteModule {}
