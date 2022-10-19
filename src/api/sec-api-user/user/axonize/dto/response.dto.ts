import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class GetUserResponse {
  @Expose({})
  @IsString()
  email: string;

  @Expose({})
  @IsString()
  username: string;

  @Expose({})
  @IsString()
  role: string;

  @Expose({})
  @IsString()
  status: string;

  @Expose({ name: 'id' })
  @IsString()
  userId: string;

  @Expose({})
  error?: any;
}

@Exclude()
export class CreateUserResponse {
  @Expose({})
  @IsString()
  email: string;

  @Expose({})
  @IsString()
  username: string;

  @Expose({})
  @IsString()
  role: string;

  @Expose({})
  @IsString()
  status: string;

  @Expose({ name: 'id' })
  @IsString()
  userId: string;

  @Expose({})
  error?: any;
}
