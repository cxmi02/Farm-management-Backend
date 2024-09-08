import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  /*   ArrayNotEmpty, */
  Max,
  Min,
} from 'class-validator';

export class CreateCorralDto {
  @ApiProperty({
    description: 'The name of the corral.',
    example: 'Corral 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'The maximum capacity of the corral in terms of number of animals.',
    example: 10,
  })
  @Min(0, { message: 'La capacidad mínima es 0.' })
  @Max(50, { message: 'La capacidad máxima es 50.' })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({
    description: 'Array of animal IDs to be assigned to this corral.',
    example: ['animal1', 'animal2'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  animals: string[];
}
