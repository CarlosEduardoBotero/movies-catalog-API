import { Repository } from 'typeorm';
import { MovieEntity } from './movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MovieRepository extends Repository<MovieEntity> {
  constructor(
    @InjectRepository(MovieEntity)
    private repository: Repository<MovieEntity>,
  ) {
    super(repository.target, repository.manager);
  }

  async deleteMovie(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um filme com o ID informado',
      );
    }

    return {
      message: 'Filme removido com sucesso',
    };
  }
}
