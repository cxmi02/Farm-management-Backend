import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  Max,
  Min,
  IsOptional,
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
    description: 'List of animal IDs associated with the corral',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly animals?: string[];
}
