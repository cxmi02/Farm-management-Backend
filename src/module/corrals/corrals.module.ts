import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Corral, CorralSchema } from './entities/corral.entity';
import { CorralService } from './service/corrals.service';
import { CorralController } from './controller/corrals.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Corral.name, schema: CorralSchema }]),
  ],
  providers: [CorralService],
  controllers: [CorralController],
})
export class CorralsModule {}
