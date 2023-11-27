import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new BadRequestException('email already exist');
    }
    return await this.usersRepository.save(createUserDto);
  }

  async findOne(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
