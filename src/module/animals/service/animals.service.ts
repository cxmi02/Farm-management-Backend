import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../entities/animals.entity.dto';
import { CreateAnimalDto } from '../dtos';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    try {
      const { name, species, age, isDangerous, restrictedWith } =
        createAnimalDto;

      const newAnimal = new this.animalModel({
        name,
        species,
        age,
        isDangerous: isDangerous || false,
        restrictedWith: restrictedWith || [],
      });

      return await newAnimal.save();
    } catch (error) {
      console.error('Error creating animal:', error.message);
      throw new InternalServerErrorException(
        'The animal could not be created. Please try again later.',
      );
    }
  }
}
