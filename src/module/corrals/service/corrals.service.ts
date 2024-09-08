import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Corral } from '../entities/corral.entity';
import { CreateCorralDto } from '../dtos';

@Injectable()
export class CorralService {
  constructor(
    @InjectModel(Corral.name) private readonly corralModel: Model<Corral>,
  ) {}

  private validateCapacity(capacity: number): void {
    if (capacity < 1 || capacity > 50) {
      throw new BadRequestException('The capacity must be between 1 and 50..');
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
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error('Error creating corral:', error.message);

      throw new InternalServerErrorException(
        'The corral could not be created. Please try again later.',
      );
    }
  }
  async findAll(): Promise<Corral[]> {
    try {
      return await this.corralModel.find().exec();
    } catch (error) {
      console.error('Error getting corrals:', error.message);
      throw new InternalServerErrorException(
        'The corral could not be created. Please try again later.',
      );
    }
  }

  async findById(id: string): Promise<Corral> {
    try {
      const corral = await this.corralModel.findById(id).exec();
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
}
