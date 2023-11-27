import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesService } from './movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserEntity } from './users/entities/users.entity';
import { MovieEntity } from './movies/movies.entity';
import { MovieRepository } from './movies/movies.repository';
import { CacheService } from 'src/lib/cache/cache.service';

console.log('pruba: ', __dirname + '/../**/*.entity{.ts}');
@Module({
  imports: [
    AuthModule,
    UsersModule,
    MoviesModule,
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
  controllers: [UsersController, AuthController, MoviesController],
  providers: [
    AuthService,
    UsersService,
    MoviesService,
    MovieRepository,
    CacheService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
