import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movies.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { PatchMovieDto } from './dtos/patch-movie.dto';
import { CacheService } from 'src/lib/cache/cache.service';
import { MovieEntity } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
    private cacheService: CacheService,
  ) {}

  async getAll() {
    let movieList: MovieEntity[];
    const raw = await this.cacheService.getKey('movie_get_all');

    if (raw) {
      movieList = JSON.parse(raw).movieList;
    } else {
      movieList = await this.movieRepository.find({
        take: 10,
        order: { updatedAt: 'DESC' },
      });
      await this.cacheService.setKey('movie_get_all', { movieList });
    }

    return movieList;
  }

  async getOne(id: number) {
    const movie = await this.cacheService.getKey(`movie_id_${id}`);
    if (movie) {
      return JSON.parse(movie);
    }

    const movieDB = await this.movieRepository.findOneBy({ id });
    await this.cacheService.setKey(`movie_id_${id}`, movieDB);

    return movieDB;
  }

  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto);
  }

  async update(id: number, updateMovieDto: PatchMovieDto) {
    let movie: MovieEntity;
    const raw = await this.cacheService.getKey(`movie_id_${id}`);

    if (raw) {
      movie = JSON.parse(raw);
    } else {
      movie = await this.movieRepository.findOneBy({ id });
    }

    Object.entries(updateMovieDto).forEach(([key, value]) => {
      movie[key] = value;
    });

    const savedMovie = await this.movieRepository.save(movie);
    await this.cacheService.setKey(`movie_id_${id}`, movie);
    return savedMovie;
  }

  async deleteOne(id: string) {
    this.cacheService.delete(`movie_id_${id}`);
    return await this.movieRepository.deleteMovie(id);
  }
}
