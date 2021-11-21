import { Module } from '@nestjs/common';
import { PlantIdController } from './plantId.controller';
import { PlantIdService } from './plantId.service';

@Module({
  controllers: [PlantIdController],
  providers: [PlantIdService],
})
export class PlantIdModule {}
