import { Controller, Post, Body, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Animal } from '../entities/animals.entity.dto';
import { AnimalService } from '../service/animals.service';
import { CreateAnimalDto } from '../dtos';

@ApiTags('Animals')
@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post('createAnimal')
  @ApiOperation({ summary: 'Create a new animal' })
  @ApiCreatedResponse({
    description: 'The animal has been successfully created.',
    type: Animal,
  })
  @ApiBadRequestResponse({
    description: 'Validation error or incorrect parameters.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error creating animal.',
  })
  async createAnimal(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<Animal> {
    return this.animalService.create(createAnimalDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({
    status: 200,
    description: 'List of all animals',
    type: [Animal],
  })
  @ApiInternalServerErrorResponse({
    description: 'Error retrieving animals',
  })
  async findAll(): Promise<Animal[]> {
    return this.animalService.findAll();
  }
}
