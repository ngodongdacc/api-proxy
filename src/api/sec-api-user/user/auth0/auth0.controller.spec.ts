import { HttpModule } from '@nestjs/axios';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TransformInterceptor } from '../../../../interceptor/transformReq.interceptor';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';
import { Auth0UserController } from './auth0.controller';
import { Auth0Service } from './auth0.service';
import { Auth0AuthenticateController } from './authentication/authentication.controller';
import { mockGuard, mockHeader, MockTransformInterceptor } from '../../../../helpers/mock.middleware.utils';
import {
  dataCreate,
  dataGetAllUser,
  dataGetUserById,
  dataUpdate,
  existDataCreate,
  existDataUpdate,
  invalidEmaildataUpdate,
  lackDataCreate,
  mockUserId,
  userId,
} from './auth0.mock.data';
import { AuthenticationService } from './authentication/authentication.service';

describe('Auth0Controller', () => {
  jest.setTimeout(30000);
  let app: INestApplication;
  let controller: Auth0UserController;

  const mockService = {
    checkUser: jest.fn((dto) => {
      if (dto.email === '') {
        throw new BadRequestException('Email is not valid.');
      } else if (dto.email === 'tungdeptrai@gmail.com') {
        throw new BadRequestException('The user already exists.');
      } else if (dto.email === 'test@cmcglobal.vn') {
        throw new BadRequestException('The user does not exist.');
      }
    }),

    findUser: jest.fn((user_id) => {
      if (user_id !== `auth0|${userId}`) {
        throw new BadRequestException(`The user does not exist.`);
      }
    }),
  };

  const mocAuth0Service = {
    createUserHandler: jest.fn((dto) => {
      mockService.checkUser(dto);

      return { userId: '1', ...dto };
    }),

    updateUserHandler: jest.fn((dto) => {
      mockService.checkUser(dto);

      return { userId: '1', ...dto };
    }),

    getUserHandler: jest.fn(() => dataGetAllUser),

    getUserByIdHandler: jest.fn(() => dataGetUserById),

    deleteUserHandler: jest.fn((userId) => {
      mockService.findUser(userId);

      return { msg: 'User blocked' };
    }),
  };

  beforeEach(async () => {
    // mock service
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [Auth0UserController, Auth0AuthenticateController],
      providers: [Auth0Service, AuthenticationService],
    })
      .overrideProvider(Auth0Service)
      .useValue(mocAuth0Service)
      .overrideGuard(AuthorizationGuard)
      .useValue(mockGuard)
      .overrideInterceptor(TransformInterceptor)
      .useClass(MockTransformInterceptor)
      .compile();

    controller = module.get<Auth0UserController>(Auth0UserController);
    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create User Auth0', () => {
    it('should create a user successful', async () => {
      const responseCreate = await controller.post(dataCreate, mockHeader);
      expect(responseCreate).toEqual({
        userId: expect.any(String),
        ...dataCreate,
      });
    });

    it('/POST create user with status code successful 200', () =>
      request(app.getHttpServer())
        .post('/user/auth0')
        .send(dataCreate)
        .expect(201)
        .expect({
          userId: '1',
          ...dataCreate,
        }));

    it('/POST create user with invalid email fail with status 400', () =>
      request(app.getHttpServer())
        .post('/user/auth0')
        .send(lackDataCreate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `Email is not valid.` }));

    it('/POST create user with user already exists fail with status 400', () =>
      request(app.getHttpServer())
        .post('/user/auth0')
        .send(existDataCreate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `The user already exists.` }));
  });

  describe('Update User Auth0', () => {
    it('should update user successful', async () => {
      const responseUpdate = await controller.update(mockUserId, dataUpdate, mockHeader);
      expect(responseUpdate).toEqual({
        userId: mockUserId,
        ...dataUpdate,
      });
    });

    it('/PUT update user with status code successful 200', () =>
      request(app.getHttpServer())
        .put('/user/auth0/auth0|1')
        .send(dataUpdate)
        .expect(200)
        .expect({
          userId: '1',
          ...dataUpdate,
        }));

    it('/PUT update user with invalid email fail with status 400', () =>
      request(app.getHttpServer())
        .put(`/user/auth0/auth0|${userId}`)
        .send(invalidEmaildataUpdate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `Email is not valid.` }));

    it('/PUT update user not found fail with status 400', () =>
      request(app.getHttpServer())
        .put(`/user/auth0/auth0|${mockUserId}`)
        .send(existDataUpdate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `The user does not exist.` }));
  });

  describe('Get User Auth0', () => {
    describe('With mock service', () => {
      it('should get all user successful', async () => {
        const responseGet = await controller.get(mockHeader);
        expect(responseGet).toEqual(dataGetAllUser);
      });
      it('should get invidiual user successful', async () => {
        const responseGet = await controller.getUserById(mockHeader, userId);
        expect(responseGet).toEqual(dataGetUserById);
      });
    });

    describe('With real service', () => {
      it('/GET GET all user status 200', () =>
        request(app.getHttpServer())
          .get('/user/auth0/all')
          .expect(200)
          .then((res) => {
            expect(res.body[0]).toHaveProperty('email');
          }));
      it('/GET should get individual user successful and return 200', () =>
        request(app.getHttpServer())
          .get(`/user/auth0/auth0|${userId}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveProperty('email');
          }));
    });
  });

  describe('Delete User Auth0', () => {
    it('should delete user successful', async () => {
      const responseDelete = await controller.block(`auth0|${userId}`, mockHeader);
      expect(responseDelete).toEqual({
        msg: 'User blocked',
      });
    });

    it('/DELETE delete user with status code successful 200', () =>
      request(app.getHttpServer()).delete(`/user/auth0/auth0|${userId}`).expect(200).expect({
        msg: 'User blocked',
      }));

    it('/DELETE delete user not exist with status code failed 400', () =>
      request(app.getHttpServer()).delete(`/user/auth0/auth0|${mockUserId}`).expect(400).expect({
        statusCode: 400,
        message: 'The user does not exist.',
        error: 'Bad Request',
      }));
  });
});
