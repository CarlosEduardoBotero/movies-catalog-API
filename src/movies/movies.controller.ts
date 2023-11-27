import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { PatchMovieDto } from './dtos/patch-movie.dto';

@ApiTags('Filmes')
@Controller({ path: 'movies', version: '1' })
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  async getAll() {
    return this.moviesService.getAll();
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.moviesService.getOne(id);
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMovieDto: PatchMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.moviesService.deleteOne(id);
  }
}
