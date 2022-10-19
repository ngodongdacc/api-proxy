import { BadRequestException, INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxonizeUserController } from './axonize.controller';
import { AxonizeService } from './axonize.service';
import * as request from 'supertest';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';
import { TransformInterceptor } from '../../../../interceptor/transformReq.interceptor';
import { mockGuard, mockHeader, MockTransformInterceptor } from '../../../../helpers/mock.middleware.utils';
import {
  dataCreate,
  dataUpdate,
  existDataCreate,
  invalidEmailDataCreate,
  invalidEmailDataUpdate,
  invalidStatusDataCreate,
  invalidStatusDataUpdate,
  mockUserId,
  dataGetUser,
  dataGetUserById,
  userId,
  notExistDataUpdate,
  realUserId,
} from './axonize.mock.data';

describe('AxonizeController', () => {
  jest.setTimeout(30000);
  let app: INestApplication;
  let controller: AxonizeUserController;

  const mockService = {
    checkUser: jest.fn((dto) => {
      if (dto.status === 'active') {
        throw new BadRequestException(`Requested value active was not found.`);
      } else if (dto.email === '') {
        throw new BadRequestException(`Email is not valid`);
      } else if (dto.email === 'tyler@cmcglobal.vn') {
        throw new BadRequestException(`Email already exists`);
      } else if (dto.email === 'test@cmcglobal.vn') {
        throw new BadRequestException(`User is not found`);
      }
    }),

    findUser: jest.fn((userId) => {
      if (userId != realUserId) {
        throw new NotFoundException(`User not found`);
      }
    }),
  };

  const mocAxonizeService = {
    createUserHandler: jest.fn((dto) => {
      mockService.checkUser(dto);

      return { userId: '1', ...dto };
    }),

    updateUserHandler: jest.fn((dto) => {
      mockService.checkUser(dto);

      return { userId: '1', ...dto };
    }),

    getUserHandler: jest.fn(() => dataGetUser),

    getUserByIdHandler: jest.fn(() => dataGetUserById),

    deleteUserByIdHandler: jest.fn((dto) => {
      mockService.findUser(dto.id || dto);

      return { msg: 'User deleted' };
    }),
  };

  beforeEach(async () => {
    // mock service
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AxonizeUserController],
      providers: [AxonizeService],
    })
      .overrideProvider(AxonizeService)
      .useValue(mocAxonizeService)
      .overrideGuard(AuthorizationGuard)
      .useValue(mockGuard)
      .overrideInterceptor(TransformInterceptor)
      .useClass(MockTransformInterceptor)
      .compile();

    controller = module.get<AxonizeUserController>(AxonizeUserController);
    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create User Axonize', () => {
    it('should create a user successful', async () => {
      const responseCreate = await controller.createUser(dataCreate, mockHeader);
      expect(responseCreate).toEqual({
        userId: expect.any(String),
        ...dataCreate,
      });
    });

    it('/POST create user with status code successful 201', () =>
      request(app.getHttpServer())
        .post('/user/axonize')
        .send(dataCreate)
        .expect(201)
        .expect({
          userId: '1',
          ...dataCreate,
        }));

    it('/POST create user with wrong status fail with status 400', () => {
      jest.fn().mockRejectedValueOnce(new Error('Connection Failed or something'));
      return request(app.getHttpServer())
        .post('/user/axonize')
        .send(invalidStatusDataCreate)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: `Requested value ${invalidStatusDataCreate.status} was not found.`,
        });
    });

    it('/POST create user with invalid email fail with status 400', () =>
      request(app.getHttpServer())
        .post('/user/axonize')
        .send(invalidEmailDataCreate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `Email is not valid` }));

    it('/POST create exist user fail with status 400', () =>
      request(app.getHttpServer())
        .post('/user/axonize')
        .send(existDataCreate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `Email already exists` }));
  });

  describe('Update User Axonize', () => {
    it('should update user successful', async () => {
      const responseUpdate = await controller.update(mockUserId, dataUpdate, mockHeader);
      expect(responseUpdate).toEqual({
        userId: expect.any(String),
        ...dataUpdate,
      });
    });

    it('/PATCH update user with status code successful 200', () =>
      request(app.getHttpServer())
        .patch(`/user/axonize/${mockUserId}`)
        .send(dataUpdate)
        .expect(200)
        .expect({
          userId: '1',
          ...dataUpdate,
        }));

    it('/PATCH update user with wrong status fail with status 400', () =>
      request(app.getHttpServer())
        .patch(`/user/axonize/${mockUserId}`)
        .send(invalidStatusDataUpdate)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: `Requested value ${invalidStatusDataUpdate.status} was not found.`,
        }));

    it('/PATCH update user with invalid email fail with status 400', () =>
      request(app.getHttpServer())
        .patch(`/user/axonize/${mockUserId}`)
        .send(invalidEmailDataUpdate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `Email is not valid` }));

    it('/PATCH update user not found fail with status 400', () =>
      request(app.getHttpServer())
        .patch(`/user/axonize/${mockUserId}`)
        .send(notExistDataUpdate)
        .expect(400)
        .expect({ statusCode: 400, error: 'Bad Request', message: `User is not found` }));
  });

  describe('Get User Axonize', () => {
    describe('With mock service', () => {
      it('should get all user successful', async () => {
        const responseGet = await controller.getAllUser(mockHeader);
        expect(responseGet).toEqual(dataGetUser);
      });
      it('should get individual user successful and return 200', async () => {
        const responseGet = await controller.getUserById(mockHeader, userId);
        expect(responseGet).toEqual(dataGetUserById);
      });
    });

    describe('With real service', () => {
      it('/GET GET all user status 200', () =>
        request(app.getHttpServer())
          .get('/user/axonize/all')
          .expect(200)
          .then((res) => {
            expect(res.body[0]).toHaveProperty('username');
          }));
      it('/GET should get individual user successful and return 200', () =>
        request(app.getHttpServer())
          .get(`/user/axonize/${userId}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveProperty('username');
          }));
    });
  });

  describe('Delete User Axonize', () => {
    it('should delete user successful', async () => {
      const responseDelete = await controller.deleteUserById({ id: realUserId }, mockHeader);
      expect(responseDelete).toEqual({
        msg: 'User deleted',
      });
    });

    it('/DELETE delete user with status code successful 200', () =>
      request(app.getHttpServer()).delete(`/user/axonize/${realUserId}`).expect(200).expect({
        msg: 'User deleted',
      }));

    it('/DELETE update user not found fail with status 400', () =>
      request(app.getHttpServer())
        .delete(`/user/axonize/${mockUserId}`)
        .expect(404)
        .expect({ statusCode: 404, message: 'User not found', error: 'Not Found' }));
  });
});
