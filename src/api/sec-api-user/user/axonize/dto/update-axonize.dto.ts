import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { EUserRole } from './create-axonize.dto';

export class UpdateAxonizeDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  @IsEnum(EUserRole)
  role: string;
}
