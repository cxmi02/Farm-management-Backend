import { Module } from '@nestjs/common';
import { AnimalsService } from './service/animals.service';
import { AnimalsController } from './controller/animals.controller';

@Module({
  providers: [AnimalsService],
  controllers: [AnimalsController]
})
export class AnimalsModule {}
