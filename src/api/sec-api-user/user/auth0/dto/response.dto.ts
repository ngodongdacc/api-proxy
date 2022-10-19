import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

@Exclude()
export class GetUserResponse {
  @Expose({})
  @IsString()
  email: string;

  @Expose({})
  @IsString()
  name: string;

  @Expose({ name: 'nickname' })
  @IsString()
  nickName: string;

  @Expose({ name: 'blocked' })
  @IsBoolean()
  isBlocked: boolean;

  @Expose({ name: 'created_at' })
  @IsString()
  createdAt: string;

  @Expose({})
  @IsString()
  picture: string;

  @Expose({ name: 'user_id' })
  @IsString()
  id: string;
}

interface UserIdentities {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}
