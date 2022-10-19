import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAuth0Dto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
