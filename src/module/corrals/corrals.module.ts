import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Corral, CorralSchema } from './entities/corral.entity';
import { CorralService } from './service/corrals.service';
import { CorralController } from './controller/corrals.controller';
import { Animal, AnimalSchema } from '../animals/entities/animals.entity.dto';
import { AnimalService } from '../animals/service/animals.service';
import { AnimalController } from '../animals/controller/animals.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Corral.name, schema: CorralSchema }]),
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
  ],
  providers: [CorralService, AnimalService],
  controllers: [CorralController, AnimalController],
})
export class CorralsModule {}
