import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PlantIdModule } from './plant-id/plantId.module';

@Module({
  imports: [DatabaseModule, PlantIdModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
