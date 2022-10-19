import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum EUserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class CreateAxonizeDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EUserRole)
  role: string;
}

export enum UserRoleId {
  ADMIN = '"FE459007-BDB1-4F7B-AE25-98BF34A5666B"',
  USER = 'A3B82A2F-E1F0-4DD1-B688-C84A4138E008',
}
