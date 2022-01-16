import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/abstract.service';
import axios from 'axios';
import { PlantId } from './entities/plant-id.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlantIdService extends AbstractService {
  constructor(
    @InjectRepository(PlantId)
    private readonly plantRepository: Repository<PlantId>,
  ) {
    super(plantRepository);
  }

  async identify(base64: string) {
    const files = [];
    files.push(base64);

    const sendData = {
      api_key: process.env.PLANT_ID_KEY,
      images: files,
      limit: 3,
      modifiers: ['crops_fast', 'similar_images', 'health_all'],
      plant_language: 'en',
      plant_details: [
        'common_names',
        'url',
        'wiki_description',
        'taxonomy',
        'synonyms',
      ],
    };

    if (files.length > 0) {
      return await axios
        .post('https://api.plant.id/v2/identify', sendData)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error('Error: ', error);
          return error;
        });
    }
  }
}
