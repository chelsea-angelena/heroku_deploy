import { Module } from '@nestjs/common';
import { ClarController } from './clar.controller';
import { ClarifaiService } from './services/clarifai.service';
import { Model } from './entities/model.entity';
import { Concept } from './entities/concept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelService } from './services/model.service';
import { ConceptService } from './services/concept.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Concept]), UsersModule],
  controllers: [ClarController],
  providers: [ClarifaiService, ModelService, ConceptService],
})
export class ClarifaiModule {}
