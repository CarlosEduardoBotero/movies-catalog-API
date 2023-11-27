import { Injectable, BadRequestException } from '@nestjs/common';
import { CredentialsDto } from 'src/users/dtos/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.usersService.findOne(credentialsDto.email);

    if (user?.password !== credentialsDto.password) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      access_token: await this.jwtService.signAsync({ sub: user['id'] }),
    };
  }
}
