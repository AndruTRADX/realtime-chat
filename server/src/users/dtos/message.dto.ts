import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessagetDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
