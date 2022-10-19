import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    required: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  password: string;
}
