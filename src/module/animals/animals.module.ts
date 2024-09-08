import { Module } from '@nestjs/common';
import { AnimalController } from './controller/animals.controller';
import { AnimalService } from './service/animals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './entities/animals.entity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
  ],
  providers: [AnimalService],
  controllers: [AnimalController],
})
export class AnimalsModule {}
