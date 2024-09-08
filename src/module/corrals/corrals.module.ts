import { Module } from '@nestjs/common';
import { CorralsService } from './service/corrals.service';
import { CorralsController } from './controller/corrals.controller';

@Module({
  providers: [CorralsService],
  controllers: [CorralsController]
})
export class CorralsModule {}
