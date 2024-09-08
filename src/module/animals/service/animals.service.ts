import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Animal } from '../entities/animals.entity.dto';
import { CreateAnimalDto, UpdateAnimalDto } from '../dtos';

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

  async findAll(): Promise<Animal[]> {
    try {
      return await this.animalModel.find().exec();
    } catch (error) {
      console.error('Error getting animals:', error.message);
      throw new InternalServerErrorException(
        'Error retrieving animals. Please try again later.',
      );
    }
  }

  async findById(id: string): Promise<Animal> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    try {
      const animal = await this.animalModel.findById(id).exec();
      if (!animal) {
        throw new NotFoundException('Animal not found');
      }
      return animal;
    } catch (error) {
      console.error('Error finding animal by ID:', error.message);
      throw new InternalServerErrorException(
        'Error retrieving animal. Please try again later.',
      );
    }
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    try {
      const updatedAnimal = await this.animalModel
        .findByIdAndUpdate(id, updateAnimalDto, { new: true })
        .exec();
      if (!updatedAnimal) {
        throw new NotFoundException('Animal not found');
      }
      return updatedAnimal;
    } catch (error) {
      console.error('Error updating animal:', error.message);
      throw new InternalServerErrorException(
        'Error updating animal. Please try again later.',
      );
    }
  }

  async delete(id: string): Promise<string> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    try {
      const result = await this.animalModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Animal not found');
      }
      return 'Animal successfully deleted';
    } catch (error) {
      console.error('Error deleting animal:', error.message);
      throw new InternalServerErrorException(
        'Error deleting animal. Please try again later.',
      );
    }
  }
}
