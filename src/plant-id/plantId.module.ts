import { Module } from '@nestjs/common';
import { PlantIdController } from './plantId.controller';
import { PlantIdService } from './plantId.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantId } from './entities/plant-id.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantId])],
  controllers: [PlantIdController],
  providers: [PlantIdService],
})
export class PlantIdModule {}
