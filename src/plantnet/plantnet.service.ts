import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/abstract.service';
import axios from 'axios';
import { PlantNet } from './entities/plantnet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Error, Response } from './interface/plantnet-response.interface';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class PlantNetService extends AbstractService {
  constructor(
    @InjectRepository(PlantNet)
    private readonly plantNetRepository: Repository<PlantNet>,
  ) {
    super(plantNetRepository);
  }

  async identify(image): Promise<unknown> {
    const image_1 = image.path;
    // const image_2 = '/data/media/image_2.jpeg';

    let form = new FormData();

    form.append('organs', 'flower');
    form.append('images', fs.createReadStream(image_1));

    form.append('organs', 'leaf');
    form.append('images', fs.createReadStream(image_1));

    try {
      const { status, data } = await axios.post(
        `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANT_NET_KEY}`,
        form,
        {
          headers: form.getHeaders(),
        },
      );

      if (data) {
        const images = data?.results?.map(async (item) => {
          return {
            images: await this.searchGoogleImages(
              item.species.scientificNameWithoutAuthor,
            ),
            ...item,
          };
        });
        return Promise.all(images);
      }
    } catch (error) {
      const myerror: Error = {
        code: error.response.status,
        status: error.response.statusText,
        message: error.response.data,
      };
      console.error('error', myerror);
      return myerror;
    }
  }

  async searchGoogleImages(query): Promise<unknown> {
    const apikey = process.env.GOOGLE_IMAGE_API_KEY;
    const cx = process.env.CX;

    const { data } = await axios.get(
      `https://customsearch.googleapis.com/customsearch/v1?key=${apikey}&cx=${cx}&q=${query}&SearchType=IMAGE&ImgType=PHOTO&num=5`,
    );

    const { items } = data;

    if (items) {
      const photos = items
        .map((itm) => itm?.pagemap?.cse_image?.map((itm) => itm))
        .map((item) => item?.[0]?.src);

      return photos;
    }
  }
}
