import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetApiKeyAxonizeDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
