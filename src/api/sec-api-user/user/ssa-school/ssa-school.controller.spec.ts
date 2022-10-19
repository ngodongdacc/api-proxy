import { Test, TestingModule } from '@nestjs/testing';
import { SsaSchoolController } from './ssa-school.controller';
import { UserService } from '../user.service';
import { SsaSchoolService } from './ssa-school.service';
import { Auth0Service } from '../auth0/auth0.service';
import { CognitoService } from '../cognito/cognito.service';
import { OauthService } from '../oauth/oauth.service';
import { IUserProvider } from '../provider/user.provider';
import { StoreService } from '../store/store.service';
import { Auth0UserController } from '../auth0/auth0.controller';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';
import { mockGuard, MockTransformInterceptor } from '../../../../helpers/mock.middleware.utils';
import { TransformInterceptor } from '../../../../interceptor/transformReq.interceptor';
import { HttpModule } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Org } from '../entities/org.entity';
import { UserNew } from '../entities/use-new.entity';
import { UserRole } from '../entities/user-role.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import {
  dataCreate,
  dataGetAllUser,
  dataGetAllUserByParams,
  dataGetUserById,
  dataUpdate,
  existDataCreate,
  invalidEmaildataUpdate,
  invalidPasswordDataCreate,
  lackEmailDataCreate,
  mockResponseDeleteData,
  mock_user_id,
  responseUser,
  responseUserNew,
  user_id,
} from './ssa-school.mock.data';

describe('UserController', () => {
  jest.setTimeout(30000);
  let controller: SsaSchoolController;
  let app: INestApplication;
  let app2: INestApplication;

  let repoUserNew: Repository<UserNew>;
  let repoUser: Repository<User>;

  const mockSsaSchoolService = {
    createUserHandler: jest.fn((dto) => ({ user_id: '1', ...dto })),
    updateUserHandler: jest.fn((userId, dto) => ({ user_id: userId, ...dto })),
    findAll: jest.fn((body) => {
      if (Object.keys(body).length === 0) return dataGetAllUser;
      else return dataGetAllUserByParams;
    }),

    findOne: jest.fn(() => dataGetUserById),

    deleteUserHandler: jest.fn((userId) => ({ user_id: userId, ...mockResponseDeleteData })),
  };

  const mockService = {
    checkUser: jest.fn((dto) => {
      if (dto.email === '') {
        throw new Error('Invalid email address format.');
      } else if (dto.password === '') {
        throw new Error('Password did not conform with policy: Password not long enough');
      } else if (dto.email === 'ricky.kung@clpsec.com') {
        throw new Error('User already exists');
      }
    }),
  };

  const mockCognitoService = {
    createUserHandler: jest.fn((dto) => {
      mockService.checkUser(dto);

      return { ...dto };
    }),

    updateUserHandler: jest.fn((dto) => {
      mockService.checkUser(dto);

      return { ...dto };
    }),

    deleteUserHandler: jest.fn((dto) => ({ ...dto })),
  };

  beforeEach(async () => {
    // mock service
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SsaSchoolController, Auth0UserController],
      providers: [
        {
          provide: IUserProvider,
          useClass: Auth0Service,
        },
        {
          provide: UserService,
          useClass: SsaSchoolService,
        },
        {
          provide: getRepositoryToken(UserNew),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Org),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: Repository,
        },
        SsaSchoolService,
        OauthService,
        StoreService,
        Auth0Service,
        CognitoService,
        ConfigService,
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockSsaSchoolService)
      .overrideGuard(AuthorizationGuard)
      .useValue(mockGuard)
      .overrideInterceptor(TransformInterceptor)
      .useClass(MockTransformInterceptor)
      .compile();

    controller = module.get<SsaSchoolController>(SsaSchoolController);
    app = module.createNestApplication();

    await app.init();

    // real service
    const module2: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SsaSchoolController, Auth0UserController],
      providers: [
        {
          provide: IUserProvider,
          useClass: Auth0Service,
        },
        {
          provide: UserService,
          useClass: SsaSchoolService,
        },
        {
          provide: getRepositoryToken(UserNew),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(),
            getManyAndCount: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Org),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserRole),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
        SsaSchoolService,
        OauthService,
        StoreService,
        Auth0Service,
        CognitoService,
        ConfigService,
      ],
    })
      .overrideProvider(CognitoService)
      .useValue(mockCognitoService)
      .overrideGuard(AuthorizationGuard)
      .useValue(mockGuard)
      .overrideInterceptor(TransformInterceptor)
      .useClass(MockTransformInterceptor)
      .compile();

    app2 = module2.createNestApplication();

    repoUserNew = module2.get<Repository<UserNew>>(getRepositoryToken(UserNew));
    repoUser = module2.get<Repository<User>>(getRepositoryToken(User));

    await app2.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create User SSA-School', () => {
    describe('With mock service', () => {
      it('should create a user successful', async () => {
        const responseCreate = await controller.create(dataCreate);
        expect(responseCreate).toEqual({
          user_id: expect.any(String),
          ...dataCreate,
        });
      });

      it('/POST create user with status code successful 201', () =>
        request(app.getHttpServer()).post('/user/ssa-school').send(dataCreate).expect(201));
    });

    describe('With real service', () => {
      it('/POST create user with invalid email fail with status 400', () =>
        request(app2.getHttpServer()).post('/user/ssa-school').send(lackEmailDataCreate).expect(400).expect({
          statusCode: 400,
          message: `Cannot create user : Invalid email address format.`,
        }));

      it('/POST create user with invalid password fail with status 400', () =>
        request(app2.getHttpServer()).post('/user/ssa-school').send(invalidPasswordDataCreate).expect(400).expect({
          statusCode: 400,
          message: `Cannot create user : Password did not conform with policy: Password not long enough`,
        }));

      it('/POST create exist user fail with status 400', () =>
        request(app2.getHttpServer()).post('/user/ssa-school').send(existDataCreate).expect(400).expect({
          statusCode: 400,
          message: `Cannot create user : User already exists`,
        }));
    });
  });

  describe('Update User SSA-School', () => {
    describe('With mock service', () => {
      it('should update user successful', async () => {
        const responseUpdate = await controller.update(user_id, dataUpdate);
        expect(responseUpdate).toEqual({
          user_id: user_id,
          ...dataUpdate,
        });
      });

      it('/PUT update user with status code successful 200', () =>
        request(app.getHttpServer()).put(`/user/ssa-school/${user_id}`).send(dataUpdate).expect(200));
    });

    describe('With real service', () => {
      it('/PUT update user not found in Cognito with status 400', () => {
        jest.spyOn(repoUserNew, 'findOne').mockImplementation().mockResolvedValueOnce(responseUserNew);

        return request(app2.getHttpServer()).put(`/user/ssa-school/${user_id}`).send(dataUpdate).expect(400).expect({
          statusCode: 400,
          message: `Cannot update user : User does not existed in Cognito`,
        });
      });

      it('/PUT update user not found fail with status 400', () =>
        request(app2.getHttpServer()).put(`/user/ssa-school/${user_id}`).send(dataUpdate).expect(400).expect({
          statusCode: 400,
          message: `Cannot update user : User does not existed`,
        }));

      it('/PUT update user with invalid email with status 400', () => {
        jest.spyOn(repoUserNew, 'findOne').mockImplementation().mockResolvedValueOnce(responseUserNew);
        jest.spyOn(repoUser, 'findOne').mockImplementation().mockResolvedValueOnce(responseUser);

        return request(app2.getHttpServer())
          .put(`/user/ssa-school/${user_id}`)
          .send(invalidEmaildataUpdate)
          .expect(400)
          .expect({
            statusCode: 400,
            message: `Cannot update user : Invalid email address format.`,
          });
      });
    });
  });

  describe('Get User SSA-School', () => {
    describe('With mock service', () => {
      it('should get all user successful with no params', async () => {
        const body = {};
        const responseGet = await controller.findAll(body);
        expect(responseGet).toEqual(dataGetAllUser);
      });

      it('should get all user successful with username params', async () => {
        const body = { username: 'testuser19@gmail.com' };
        const responseGet = await controller.findAll(body);
        expect(responseGet).toEqual(dataGetAllUserByParams);
      });

      it('should get user by id successful', async () => {
        const id = '1';
        const responseGet = await controller.findOne(id);
        expect(responseGet).toEqual(dataGetUserById);
      });
    });
  });

  describe('Delete User SSA-School', () => {
    describe('With mock service', () => {
      it('should delete user successful', async () => {
        const responseDelete = await controller.remove(user_id);
        expect(responseDelete).toEqual({
          user_id: user_id,
          ...mockResponseDeleteData,
        });
      });

      it('/DELETE delete user with status code successful 200', () =>
        request(app.getHttpServer()).delete(`/user/ssa-school/${user_id}`).expect(200));
    });

    describe('With real service', () => {
      it('/DELETE delete user not found in Cognito with status 400', () => {
        jest.spyOn(repoUserNew, 'findOne').mockImplementation().mockResolvedValueOnce(responseUserNew);

        return request(app2.getHttpServer()).delete(`/user/ssa-school/${mock_user_id}`).expect(400).expect({
          statusCode: 400,
          message: `Cannot delete user : User does not existed`,
        });
      });

      it('/DELETE delete user not found fail with status 400', () =>
        request(app2.getHttpServer()).delete(`/user/ssa-school/${mock_user_id}`).expect(400).expect({
          statusCode: 400,
          message: `Cannot delete user : User does not existed`,
        }));
    });
  });
});
