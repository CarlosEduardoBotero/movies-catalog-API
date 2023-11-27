import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserEntity } from './users/entities/users.entity';
import { MovieEntity } from './movies/movies.entity';
import { CacheService } from 'src/lib/cache/cache.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_URL'),
        entities: [UserEntity, MovieEntity],
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    AuthService,
    UsersService,
    CacheService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
