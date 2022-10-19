import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { IUserProvider } from '../provider/user.provider';
import * as aws from 'aws-sdk';

@Injectable()
export class CognitoService implements IUserProvider {
  private userPool: CognitoUserPool;
  //private cognitoUser: CognitoUser;
  private cognitoClient = new aws.CognitoIdentityServiceProvider({
    apiVersion: 'latest',
    region: 'ap-southeast-1',
  });
  constructor(private readonly configService: ConfigService) {
    aws.config.update({
      region: this.configService.get<string>('AWS_COGNITO_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESSKEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USERPOOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  createUserHandler(createUserDto: CreateUserDto): Promise<any> {
    return new Promise((resolve, reject) =>
      this.userPool.signUp(
        createUserDto.email,
        createUserDto.password,
        [new CognitoUserAttribute({ Name: 'email', Value: createUserDto.email })],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          } else {
            const confirmUser = {
              UserPoolId: this.configService.get<string>('AWS_COGNITO_USERPOOL_ID'),
              Username: createUserDto.email,
            };
            this.cognitoClient.adminConfirmSignUp(confirmUser, (err, success) => {
              if (err) {
                reject(err);
              } else {
                resolve(success);
              }
            });
            resolve(result.user);
          }
        },
      ),
    );
  }

  async updateUserHandler(updateUserDto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (updateUserDto.password) {
        this.cognitoClient.adminSetUserPassword(
          {
            Password: updateUserDto.password,
            Permanent: true,
            UserPoolId: this.configService.get<string>('AWS_COGNITO_USERPOOL_ID'),
            Username: updateUserDto.cognito_username,
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      }
      if (updateUserDto.email) {
        this.cognitoClient.adminUpdateUserAttributes(
          {
            UserPoolId: this.configService.get<string>('AWS_COGNITO_USERPOOL_ID'),
            Username: updateUserDto.cognito_username,
            UserAttributes: [
              {
                Name: 'email',
                Value: updateUserDto.email,
              },
            ],
          },
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          },
        );
      }
    });
  }
  deleteUserHandler(deleteUserDto: any): Promise<any> {
    return new Promise((resolve, reject) =>
      this.cognitoClient.adminDisableUser(
        {
          UserPoolId: this.configService.get<string>('AWS_COGNITO_USERPOOL_ID'),
          Username: deleteUserDto.cognito_username,
        },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      ),
    );
  }

  unblockUserHandle(reactivedUser: any): Promise<any> {
    return new Promise((resolve, reject) =>
      this.cognitoClient.adminEnableUser(
        {
          UserPoolId: this.configService.get<string>('AWS_COGNITO_USERPOOL_ID'),
          Username: reactivedUser.cognito_username,
        },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      ),
    );
  }

  loginHandler(loginDto: LoginDTO): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: loginDto.username,
      Password: loginDto.password,
    });
    const userData = {
      Username: loginDto.username,
      Pool: this.userPool,
    };
    const user = new CognitoUser(userData);
    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      }),
    );
  }
}
