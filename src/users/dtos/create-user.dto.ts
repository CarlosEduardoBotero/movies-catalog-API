import { CredentialsDto } from './credentials.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends CredentialsDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
}
