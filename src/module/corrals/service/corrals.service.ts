import {
  /*   BadRequestException, */
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Corral } from '../entities/corral.entity';
/* import { CreateCorralDto } from '../dtos'; */

@Injectable()
export class CorralService {
  constructor(@InjectModel(Corral.name) private corralModel: Model<Corral>) {}

  async create(name: string, capacity: number): Promise<Corral> {
    try {
      if (capacity < 1 || capacity > 50) {
        throw new Error('La capacidad debe estar entre 1 y 50.');
      }

      const newCorral = new this.corralModel({ name, capacity });
      return await newCorral.save();
    } catch (error) {
      console.error('Error al crear el corral:', error.message);
      throw new InternalServerErrorException(
        'No se pudo crear el corral. Inténtalo de nuevo más tarde.',
      );
    }
  }
}
