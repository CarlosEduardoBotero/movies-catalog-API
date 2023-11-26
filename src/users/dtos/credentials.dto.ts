import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
