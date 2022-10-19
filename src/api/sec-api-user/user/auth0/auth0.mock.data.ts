import { CreateAuth0Dto } from './dto/create-auth0.dto';
import { UpdateAuth0Dto } from './dto/update-auth0.dto';

export const dataCreate: CreateAuth0Dto = {
  first_name: 'LENA',
  last_name: 'active',
  email: 'btanguyet@cmcglobal.vn',
  password: '123456',
};

export const existDataCreate: CreateAuth0Dto = {
  email: 'tungdeptrai@gmail.com',
  first_name: 'Tung',
  last_name: 'Do',
  password: 'Testing@12345',
};

export const lackDataCreate: CreateAuth0Dto = {
  first_name: 'LENA',
  last_name: 'active',
  email: '',
  password: 'password',
};

export const dataGetAllUser = [
  {
    email: 'testing123@gmail.com',
    name: 'John222',
    nickName: 'testing123',
    isBlocked: false,
    createdAt: '2022-08-12T01:59:19.690Z',
    picture:
      'https://s.gravatar.com/avatar/d8d19ceab0b10bb04f8b4c2fe991a1b9?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png',
    id: 'auth0|62f5b3f7276e28eb38cef726',
  },
  {
    email: 'ricky.kung@clp.com.hk',
    name: 'ricky.kung@clp.com.hk',
    nickName: 'ricky.kung',
    isBlocked: false,
    createdAt: '2022-08-10T08:08:52.069Z',
    picture:
      'https://s.gravatar.com/avatar/926e0eafe0b5a40f17947519e6119843?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fri.png',
    id: 'auth0|62f36794545f6f313daebeb8',
  },
];

export const dataGetUserById = {
  email: 'testing123@gmail.com',
  name: 'John222',
  nickName: 'testing123',
  isBlocked: false,
  createdAt: '2022-08-12T01:59:19.690Z',
  picture:
    'https://s.gravatar.com/avatar/d8d19ceab0b10bb04f8b4c2fe991a1b9?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png',
  id: 'auth0|62f5b3f7276e28eb38cef726',
};

export const mockUserId = '1';

export const userId = '62f5b3f7276e28eb38cef726';

export const dataUpdate: UpdateAuth0Dto = {
  user_name: 'LENA',
  first_name: 'LENA',
  last_name: 'active',
  email: 'btanguyet@cmcglobal.vn',
  password: '123456',
  blocked: false,
};

export const invalidEmaildataUpdate: UpdateAuth0Dto = {
  user_name: 'LENA',
  email: '',
  first_name: 'John222',
  last_name: 'testing123',
  password: 'Tango@123456',
  blocked: false,
};

export const existDataUpdate: UpdateAuth0Dto = {
  user_name: 'LENA',
  first_name: 'LENA',
  last_name: 'active',
  email: 'test@cmcglobal.vn',
  password: '123456',
  blocked: false,
};
