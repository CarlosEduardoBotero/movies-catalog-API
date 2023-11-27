import { CredentialsDto } from './credentials.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends CredentialsDto {
  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: 'name',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;
}
