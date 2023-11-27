import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
