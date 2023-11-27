import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: 'test@test.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: '123456',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
