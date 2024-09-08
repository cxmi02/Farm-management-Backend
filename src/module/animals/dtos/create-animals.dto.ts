import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnimalDto {
  @ApiProperty({
    description: 'Name of the animal',
    example: 'Lion',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Species of the animal',
    example: 'Panthera leo',
  })
  @IsString()
  @IsNotEmpty()
  readonly species: string;

  @ApiProperty({
    description: 'Age of the animal',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  readonly age?: number;

  @ApiProperty({
    description: 'Whether the animal is dangerous',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isDangerous?: boolean;

  @ApiProperty({
    description: 'List of restrictions associated with the animal',
    example: ['No contact with other animals'],
    type: [String],
    default: [],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  readonly restrictedWith?: string[];
}
