import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  id: string;
  cognito_username: string;
}
