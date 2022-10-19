import { GetApiKeyAxonizeDto } from './dto/api-key-axonize.dto';
import { CreateAxonizeDto } from './dto/create-axonize.dto';
import { UpdateAxonizeDto } from './dto/update-axonize.dto';

export const dataCreate: CreateAxonizeDto = {
  username: 'LENA',
  status: 'Activated',
  email: 'btanguyet@cmcglobal.vn',
  password: '123456',
  role: 'user',
};

export const dataForApiKey: GetApiKeyAxonizeDto = {
  email: 'dttung3@cmcglobal.vn',
  password: 'Tango@562314',
};

export const invalidStatusDataCreate: CreateAxonizeDto = {
  username: 'LENA',
  status: 'active',
  email: 'btanguyet@cmcglobal.vn',
  password: '',
  role: '',
};

export const invalidEmailDataCreate: CreateAxonizeDto = {
  email: '',
  username: 'Tyler',
  status: 'Activated',
  password: 'Testing@1234',
  role: 'user',
};

export const dataGetUser = [
  {
    email: 'herman.ph.chan@clp.com.hk',
    username: 'Herman Chan',
    role: null,
    status: 'Activated',
    userId: '607d5681541ea7b46304b5f0',
  },
  {
    email: 'manfred.lee@clp.com.hk',
    username: 'Manfred Lee',
    role: null,
    status: 'Activated',
    userId: '607d56f5541ea7b46304b5f2',
  },
];

export const dataGetUserById = {
  email: 'dttung3@cmcglobal.vn',
  username: 'Tyler Do',
  role: 'admin',
  status: 'Activated',
  userId: '607d5681541ea7b46304b5f0',
};
export const existDataCreate: CreateAxonizeDto = {
  email: 'tyler@cmcglobal.vn',
  username: 'Tyler',
  status: 'Activated',
  password: '1234',
  role: 'user',
};

export const userId = '607d5681541ea7b46304b5f0';
export const mockUserId = '1';

export const realUserId = '630446e61d4dc6eba5e4e848';

export const dataUpdate: UpdateAxonizeDto = {
  email: 'btanguyet@cmcglobal.vn',
  username: 'Tyler',
  status: 'Activated',
  role: 'user',
  password: '',
};

export const invalidStatusDataUpdate: UpdateAxonizeDto = {
  email: 'tyler@cmcglobal.vn',
  username: 'Tyler',
  status: 'active',
  role: 'user',
  password: '',
};

export const invalidEmailDataUpdate: UpdateAxonizeDto = {
  email: '',
  username: 'Tyler',
  status: 'Activated',
  role: 'user',
  password: '',
};

export const notExistDataUpdate: UpdateAxonizeDto = {
  email: 'test@cmcglobal.vn',
  username: 'Tyler',
  status: 'Activated',
  role: 'user',
  password: '',
};
