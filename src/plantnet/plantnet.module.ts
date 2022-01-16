import { Module } from '@nestjs/common';
import { PlantNetController } from './plantnet.controller';
import { PlantNetService } from './plantnet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantNet } from './entities/plantnet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantNet])],
  controllers: [PlantNetController],
  providers: [PlantNetService],
})
export class PlantNetModule {}
