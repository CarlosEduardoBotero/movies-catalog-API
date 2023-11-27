import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from 'src/users/dtos/credentials.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Public } from './decorators/public.decorator';
import { UsersService } from 'src/users/users.service';

@ApiTags('Autorização')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('signin')
  signIn(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signIn(credentialsDto);
  }

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
