import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Org } from '../entities/org.entity';
import { UserRole } from '../entities/user-role.entity';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    required: false,
  })
  @IsEmail()
  email2: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    required: false,
    maxLength: 1,
  })
  @IsString()
  gender: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  mobile: string;

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  send_notif: boolean;

  @ApiProperty({
    required: true,
    default: { org_id: 2 },
  })
  org: Org;

  @ApiProperty({
    required: true,
    default: { user_role_id: 2 },
  })
  user_role: UserRole;
}
