import { IsNotEmpty, IsString } from 'class-validator';

export class GetAuth0Dto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
