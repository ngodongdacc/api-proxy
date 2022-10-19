import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserType as UserTypeInterface } from 'src/helpers/enum';
export class LoginDTO {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: false,
  })
  userType: UserTypeInterface; // admin, store,
}
