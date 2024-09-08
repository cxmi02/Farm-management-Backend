import { Module } from '@nestjs/common';
import { AnimalController } from './controller/animals.controller';
import { AnimalService } from './service/animals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './entities/animals.entity.dto';
import { Corral, CorralSchema } from '../corrals/entities/corral.entity';
import { CorralService } from '../corrals/service/corrals.service';
import { CorralController } from '../corrals/controller/corrals.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    MongooseModule.forFeature([{ name: Corral.name, schema: CorralSchema }]),
  ],
  providers: [AnimalService, CorralService],
  controllers: [AnimalController, CorralController],
})
export class AnimalsModule {}
