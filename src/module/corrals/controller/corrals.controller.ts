import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
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
  @ApiResponse({
    status: 500,
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
    description: 'Error getting pens',
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
}
