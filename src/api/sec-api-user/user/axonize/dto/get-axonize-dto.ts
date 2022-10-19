import { IsNotEmpty, IsString } from 'class-validator';

export class GetAxonizeDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
