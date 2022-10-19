import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAuth0Dto {
  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  user_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  blocked: boolean;
}
