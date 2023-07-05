import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
