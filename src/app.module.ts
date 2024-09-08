import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './persistence/db-config';
import { PersistenceModule } from './persistence';
import { CorralsModule } from './module/corrals/corrals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    CorralsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
