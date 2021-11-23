import { Module } from '@nestjs/common';
import { ClarifaiController } from './clarifai.controller';
import { ClarifaiService } from './clarifai.service';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  controllers: [ClarifaiController],
  providers: [ClarifaiService],
})
export class ClarifaiModule {}
