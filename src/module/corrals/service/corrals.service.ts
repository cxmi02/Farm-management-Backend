import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Corral } from '../entities/corral.entity';
import { CreateCorralDto, UpdateCorralDto } from '../dtos';
import { Animal } from 'src/module/animals/entities/animals.entity.dto';

@Injectable()
export class CorralService {
  constructor(
    @InjectModel(Corral.name) private readonly corralModel: Model<Corral>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
  ) {}

  private validateCapacity(capacity: number): void {
    if (capacity < 1 || capacity > 50) {
      throw new BadRequestException('The capacity must be between 1 and 50.');
    }
  }

  async create(createCorralDto: CreateCorralDto): Promise<Corral> {
    try {
      const { name, capacity, animals } = createCorralDto;

      this.validateCapacity(capacity);

      const newCorral = new this.corralModel({
        name,
        capacity,
        animals: animals || [],
      });

      return await newCorral.save();
    } catch (error) {
      console.error('Error creating corral:', error.message);
      throw new InternalServerErrorException(
        'Error creating corral. Please try again later.',
      );
    }
  }

  async findAll(): Promise<Corral[]> {
    try {
      return await this.corralModel.find().populate('animals').exec();
    } catch (error) {
      console.error('Error getting corrals:', error.message);
      throw new InternalServerErrorException(
        'Error getting corrals. Please try again later.',
      );
    }
  }

  async findById(id: string): Promise<Corral> {
    try {
      const corral = await this.corralModel
        .findById(id)
        .populate('animals')
        .exec();
      if (!corral) {
        throw new NotFoundException('Corral not found');
      }
      return corral;
    } catch (error) {
      console.error('Error finding corral by ID:', error.message);
      throw new InternalServerErrorException(
        'Error retrieving corral. Please try again later.',
      );
    }
  }

  async update(id: string, updateCorralDto: UpdateCorralDto): Promise<Corral> {
    try {
      const updatedCorral = await this.corralModel
        .findByIdAndUpdate(id, updateCorralDto, { new: true })
        .populate('animals')
        .exec();
      if (!updatedCorral) {
        throw new NotFoundException('Corral not found');
      }
      return updatedCorral;
    } catch (error) {
      console.error('Error updating corral:', error.message);
      throw new InternalServerErrorException(
        'Error updating corral. Please try again later.',
      );
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const result = await this.corralModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Corral not found');
      }
      return 'Corral successfully deleted';
    } catch (error) {
      console.error('Error deleting corral:', error.message);
      throw new InternalServerErrorException(
        'Error deleting corral. Please try again later.',
      );
    }
  }

  async getAnimalSummary(): Promise<any> {
    try {
      const corrals = await this.corralModel.find().populate('animals').exec();

      return corrals.map((corral) => ({
        corralName: corral.name,
        highDangerAnimals: corral.animals.filter(
          (animal: any) => animal.isDangerous,
        ),
      }));
    } catch (error) {
      console.error('Error getting animal summary:', error.message);
      throw new InternalServerErrorException(
        'Error getting animal summary. Please try again later.',
      );
    }
  }

  async getAverageAnimalAge(corralId: string): Promise<number> {
    try {
      // Buscar el corral por ID y poblar los animales
      const corral = await this.corralModel
        .findById(corralId)
        .populate<{ animals: Animal[] }>('animals')
        .exec();

      if (!corral) {
        throw new NotFoundException('Corral not found');
      }

      // Obtener los animales del corral
      const animals = corral.animals;

      // Calcular el promedio de edad
      const totalAge = animals.reduce(
        (sum, animal) => sum + (animal.age || 0),
        0,
      );
      const averageAge = animals.length > 0 ? totalAge / animals.length : 0;

      return averageAge;
    } catch (error) {
      console.error('Error getting average animal age:', error.message);
      throw new InternalServerErrorException(
        'Error calculating average animal age',
      );
    }
  }
}
