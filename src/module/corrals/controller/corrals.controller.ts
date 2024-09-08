import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCorralDto, UpdateCorralDto } from '../dtos';
import { CorralService } from '../service/corrals.service';
import { Corral } from '../entities/corral.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Corrals')
@Controller('corrals')
export class CorralController {
  constructor(private readonly corralService: CorralService) {}

  @Post('createCorral')
  @ApiOperation({ summary: 'Create a new corral' })
  @ApiCreatedResponse({
    description: 'The corral has been successfully created.',
    type: Corral,
  })
  @ApiBadRequestResponse({
    description: 'Validation error or incorrect parameters.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error creating corral.',
  })
  async createCorral(
    @Body() createCorralDto: CreateCorralDto,
  ): Promise<Corral> {
    return this.corralService.create(createCorralDto);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all the corrals' })
  @ApiResponse({
    status: 200,
    description: 'List of all corrals',
    type: [Corral],
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error retrieving corrals.',
  })
  async findAll(): Promise<Corral[]> {
    return this.corralService.findAll();
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Retrieve a corral by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the corral.',
    type: Corral,
  })
  @ApiNotFoundResponse({
    description: 'Corral not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error retrieving corral.',
  })
  async findById(@Param('id') id: string): Promise<Corral> {
    return this.corralService.findById(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a corral by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The corral has been successfully updated.',
    type: Corral,
  })
  @ApiNotFoundResponse({
    description: 'Corral not found.',
  })
  @ApiBadRequestResponse({
    description: 'Validation error or incorrect parameters.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error updating corral.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCorralDto: UpdateCorralDto,
  ): Promise<Corral> {
    return this.corralService.update(id, updateCorralDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a corral by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The corral has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Corral not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error deleting corral.',
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.corralService.delete(id);
    return { message: result };
  }

  @Get('animalSummary')
  @ApiOperation({ summary: 'Get a summary of animals grouped by corral' })
  @ApiResponse({
    status: 200,
    description: 'Summary of animals grouped by corral',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error retrieving animal summary.',
  })
  async getAnimalSummary(): Promise<any> {
    return this.corralService.getAnimalSummary();
  }
}
