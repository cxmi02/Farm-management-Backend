import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Animal } from '../entities/animals.entity.dto';
import { AnimalService } from '../service/animals.service';
import { CreateAnimalDto, UpdateAnimalDto } from '../dtos';

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

  @Get('findById/:id')
  @ApiOperation({ summary: 'Retrieve an animal by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the animal.',
    type: Animal,
  })
  @ApiNotFoundResponse({
    description: 'Animal not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error retrieving animal.',
  })
  async findById(@Param('id') id: string): Promise<Animal> {
    return this.animalService.findById(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update an animal by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The animal has been successfully updated.',
    type: Animal,
  })
  @ApiNotFoundResponse({
    description: 'Animal not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format or validation error.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error updating animal.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<Animal> {
    return this.animalService.update(id, updateAnimalDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an animal by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The animal has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Animal not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error deleting animal.',
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.animalService.delete(id);
    return { message: result };
  }
}
