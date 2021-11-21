import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { PlantIdModule } from './plant-id/plantId.module';

@Module({
  imports: [DatabaseModule, PlantIdModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
