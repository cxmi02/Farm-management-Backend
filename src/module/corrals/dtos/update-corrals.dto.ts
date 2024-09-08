import { PartialType } from '@nestjs/mapped-types';
import { CreateCorralDto } from './create-corrals.dto';

export class UpdateCorralDto extends PartialType(CreateCorralDto) {}
