import { Test, TestingModule } from '@nestjs/testing';
import { Auth0AuthenticateController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import * as request from 'supertest';
import { INestApplication, UnauthorizedException } from '@nestjs/common';

describe('Auth0Controller', () => {
  let app: INestApplication;
  let controller: Auth0AuthenticateController;
  const bodyData = {
    email: 'testing123@gmail.com',
    password: 'Tango@123456',
  };

  const mockBodyData = {
    email: 'testing123@gmail.com',
    password: 'Tango@12345687',
  };

  const responseData = {
    accessToken: 'accessToken',
    expriesIn: 86400,
    tokenType: 'Bearer',
    username: 'John222',
  };

  const mockAuthenticationService = {
    loginUserHandler: jest.fn((dto) => {
      if (dto.password === mockBodyData.password) {
        throw new UnauthorizedException('Wrong email or password.');
      }

      return { ...responseData };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth0AuthenticateController],
      providers: [AuthenticationService],
    })
      .overrideProvider(AuthenticationService)
      .useValue(mockAuthenticationService)
      .compile();

    controller = module.get<Auth0AuthenticateController>(Auth0AuthenticateController);
    app = module.createNestApplication();

    await app.init();
  });

  it('should login', async () => {
    const responseLogin = await controller.login(bodyData);
    expect(responseLogin).toEqual({ ...responseData });
  });

  it('login user successful', () => request(app.getHttpServer()).post('/login').send(bodyData).expect(200));

  it('login user unsuccessful', async () =>
    request(app.getHttpServer())
      .post('/login')
      .send(mockBodyData)
      .expect(401)
      .expect({ statusCode: 401, error: 'Unauthorized', message: `Wrong email or password.` }));
});
