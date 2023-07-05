import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsUrl()
  readonly avatarURL: string;

  @IsString()
  readonly googleId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
