import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: 'titanic',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: '1997',
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default:
      'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
  })
  @IsNotEmpty()
  @Length(1, 240)
  description: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'image URL',
  })
  @IsOptional()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: 'james cameron',
  })
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'number',
    default: 8,
  })
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'This is a required property',
    minimum: 1,
    type: 'string',
    default: '3h 14m',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/[0-9]h\s[0-9][0-9]m/)
  length: string;
}
