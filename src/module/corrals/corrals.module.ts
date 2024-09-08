import { Module } from '@nestjs/common';
import { CorralsService } from './service/corrals.service';
import { CorralsController } from './controller/corrals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Corral, CorralSchema } from './entities/corral.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Corral.name, schema: CorralSchema }]),
  ],
  providers: [CorralsService],
  controllers: [CorralsController]
})
export class CorralsModule {}
