import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { PatchMovieDto } from './dtos/patch-movie.dto';

@ApiTags('Filmes')
@Controller({ path: 'movies', version: '1' })
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getAll() {
    return this.moviesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.moviesService.getOne(id);
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMovieDto: PatchMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.moviesService.deleteOne(id);
  }
}
