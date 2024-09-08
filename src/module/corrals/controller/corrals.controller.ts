import {
  Controller,
  /*   Get, */
  Post,
  Body,
  /*   Param,
  Put,
  Delete, */
} from '@nestjs/common';
import { CorralService } from '../service/corrals.service';
import { CreateCorralDto } from '../dtos';
import { Corral } from '../entities/corral.entity';

@Controller('corrals')
export class CorralController {
  constructor(private readonly corralService: CorralService) {}

  @Post('createCorral')
  async create(@Body() createCorralDto: CreateCorralDto): Promise<Corral> {
    const { name, capacity } = createCorralDto;
    return this.corralService.create(name, capacity);
  }
}
