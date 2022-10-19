import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuth0Dto {
  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
