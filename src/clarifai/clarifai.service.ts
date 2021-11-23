import { Injectable } from '@nestjs/common';
import { clar } from './clar.api';
import { CreateModelDto } from './dto/createModel.dto';
import { AddInputsDto, UpdateInputsDto } from './dto/inputs.dto';
import { PredictDto } from './dto/predict.dto';
import { Model } from '../clarifai/entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClarifaiService {
  constructor(
    @InjectRepository(Model)
    private clarifaiRepository: Repository<Model>,
  ) {}

  public async getInputs() {
    const response = await clar.get('/v2/inputs');
    return response.data;
  }

  public async addInputs(addInputsDto: AddInputsDto) {
    const data = {
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.USER_APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: `${encodeURI(addInputsDto?.base64)}`,
              // url: addInputsDto?.url,
            },
            concepts: [
              {
                id: addInputsDto.concept,
                value: 1,
              },
            ],
          },
        },
      ],
    };

    try {
      const response = await clar.post('/v2/inputs', data);
      console.log(response.data, 'response');
      return response.data;
    } catch (err) {
      return err.response;
    }
  }

  public async deleteInput(id: string) {
    const { data } = await clar.delete(`/v2/inputs/${id}`);
    return data;
  }

  public async updateInputs(updateDto: UpdateInputsDto) {
    const sendData = {
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.USER_APP_ID,
      },
      inputs: [
        {
          id: updateDto.id,
          data: {
            concepts: [
              {
                id: updateDto.concept,
                value: 1,
              },
            ],
          },
        },
      ],
      action: 'merge',
    };
    try {
      const { data } = await clar.patch('/v2/inputs', JSON.stringify(sendData));
      return data;
    } catch (err) {
      return err.response;
    }
  }

  public async createModel(createModelDto: CreateModelDto) {
    const data = {
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.USER_APP_ID,
      },
      model: {
        id: createModelDto.id,
        output_info: {
          data: {
            concepts: [
              {
                id: createModelDto.concept,
                value: 1,
              },
            ],
          },
        },
      },
    };
    const raw = JSON.stringify(data);

    try {
      const response = await clar.post('/v2/models', raw);
      const newModel = await this.clarifaiRepository.create(response.data);
      await this.clarifaiRepository.save(newModel);
      return response?.data;
    } catch (err) {
      return err;
    }
  }

  public async updateModel(conceptId: string) {
    const ModelPatchData = {
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.USER_APP_ID,
      },
      models: [
        {
          id: 'custom_model',
          output_info: {
            data: {
              concepts: [
                {
                  id: conceptId,
                },
              ],
            },
          },
        },
      ],
      action: 'merge',
    };

    try {
      const response = await clar.patch('/v2/models', ModelPatchData);
      return response?.data;
    } catch (err) {
      return err;
    }
  }

  public async trainModel() {
    try {
      const response = await clar.post(
        `/v2/users/me/apps/${process.env.USER_APP_ID}/models/custom_model/versions`,
      );
      return response?.data;
    } catch (err) {
      return err;
    }
  }

  public async predictWithModel(predictDto: PredictDto) {
    const data = {
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.USER_APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: `${encodeURI(predictDto?.base64)}`,
              url: predictDto?.url,
            },
          },
        },
      ],
      model: {
        output_info: {
          output_config: {
            min_value: 0.5,
          },
        },
      },
    };
    console.log(process.env.USER_ID, process.env.USER_APP_ID);
    try {
      const response = await clar.post(
        `v2/models/custom_model/outputs`,
        JSON.stringify(data),
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  }
}
