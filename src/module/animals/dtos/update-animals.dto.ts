import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animals.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}
