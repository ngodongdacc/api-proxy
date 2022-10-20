import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService, Http } from 'src/common/service/client.service';
import { Auth0UserController } from './auth0/auth0.controller';
import { Auth0Service } from './auth0/auth0.service';
import { CognitoService } from './cognito/cognito.service';
import { Org } from './entities/org.entity';
import { UserNew } from './entities/use-new.entity';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { OauthService } from './oauth/oauth.service';
import { IUserProvider } from './provider/user.provider';
import { SsaSchoolController } from './ssa-school/ssa-school.controller';
import { SsaSchoolService } from './ssa-school/ssa-school.service';
import { StoreService } from './store/store.service';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserNew, User, Org, UserRole])],
  controllers: [SsaSchoolController],
  providers: [
    {
      provide: IUserProvider,
      useClass: Auth0Service,
    },
    {
      provide: UserService,
      useClass: SsaSchoolService,
    },
    SsaSchoolService,
    OauthService,
    StoreService,
    Auth0Service,
    CognitoService,
    Http,
  ],
})
export class UserModule {}
