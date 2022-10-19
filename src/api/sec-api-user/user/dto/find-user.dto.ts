import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { UserStatus as UserStatusInterface } from '../../../../helpers/enum';

export class FindUserDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  status?: UserStatusInterface;

  // query with org
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  orgid?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  orgtype?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  orgname?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  orgnamechi?: string;
  //

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  skip?: number;
}
