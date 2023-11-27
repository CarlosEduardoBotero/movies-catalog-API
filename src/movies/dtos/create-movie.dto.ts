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
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @Length(1, 240)
  description: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  director: string;

  @IsNotEmpty()
  @Min(0)
  @Max(10)
  @IsNumber()
  rating: number;

  @IsString()
  @Matches(/[0-9]h\s[0-9][0-9]m/)
  length: string;
}
