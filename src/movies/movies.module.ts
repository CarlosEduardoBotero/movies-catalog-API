import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movies.entity';
import { MovieRepository } from './movies.repository';
import { CacheService } from 'src/lib/cache/cache.service';

@Module({
  providers: [MoviesService, MovieRepository, CacheService],
  controllers: [MoviesController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
})
export class MoviesModule {}
