import { Controller, Post, Body } from '@nestjs/common';
import { CreateCorralDto } from '../dtos';
import { CorralService } from '../service/corrals.service';
import { Corral } from '../entities/corral.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
}
