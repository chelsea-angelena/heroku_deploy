import { Injectable } from '@nestjs/common';
import { clar } from '../clar.api';
import { ModelService } from './model.service';
@Injectable()
export class ClarifaiService {
  constructor(private readonly modelService: ModelService) {}

  async getInputs(user): Promise<any> {
    console.log(process.env.APP_ID);
    try {
      const { data } = await clar.get(
        `https://api.clarifai.com/v2/users/me/apps/${process.env.APP_ID}/inputs?page=1&per_page=10`,
      );
      console.log(data, 'data');
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  public async addInputs(body, user) {
    const data = {
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: `${encodeURI(body?.base64)}`,
            },
            concepts: [
              {
                id: body.concept,
                value: 1,
              },
            ],
          },
        },
      ],
    };

    try {
      const response = await clar.post('/v2/inputs', data);

      return response.data;
    } catch (err) {
      console.log(err.response.data.status);
    }
  }

  public async addOnlyInputs(body, user) {
    const data = JSON.stringify({
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: `${encodeURI(body?.base64)}`,
            },
          },
        },
      ],
    });

    try {
      const response = await clar.post('/v2/inputs', data);
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }

  public async deleteInput(id: string) {
    const { data } = await clar.delete(`/v2/inputs/${id}`);
    return data;
  }

  public async updateInputs(body, id, user) {
    const sendData = JSON.stringify({
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      inputs: [
        {
          id: id,
          data: {
            concepts: [
              {
                id: body.concept,
                value: 1,
              },
            ],
          },
        },
      ],
      action: 'merge',
    });
    try {
      const { data } = await clar.patch('/v2/inputs', sendData);
      return data;
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }

  async createModel(body, user) {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      model: {
        id: body.model,
        output_info: {
          data: {
            concepts: [
              {
                id: body.concept,
                value: 1,
              },
            ],
          },
        },
      },
    });

    try {
      const res = await clar.post('/v2/models', raw);
      return res.data;
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }

  public async getModelInfo(user) {
    const model = await this.modelService.findOne({
      where: { user },
    });
    if (!model) {
      const model = await this.modelService.create({ user });
      return await this.updateModelDB(model);
    }
    return await this.updateModelDB(model);
  }

  public async updateModelDB(model) {
    const { data } = await clar.get(
      `/v2/users/me/apps/${process.env.APP_ID}/models/${process.env.MODEL_ID}`,
    );

    await this.modelService.update(model.id, {
      ...model,
      status: data.model.model_version.status,
      versionId: data.model.model_version.id,
    });
    return data;
  }

  public async updateModel(conceptId: string, user) {
    const ModelPatchData = {
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      models: [
        {
          id: process.env.MODEL_ID,
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

  async trainModel(user) {
    try {
      const model = await this.modelService.findOne({
        where: { user },
      });

      const trained = await clar.post(
        `/v2/users/me/apps/${process.env.APP_ID}/models/${process.env.MODEL_ID}/versions`,
      );
      if (trained) {
        return await this.updateModelDB(model);
      }
    } catch (err) {
      console.log(err.response);
    }
  }

  public async predictWithModel(base64, user) {
    const model = await this.modelService.findOne({ where: { user } });
    const data = JSON.stringify({
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: `${encodeURI(base64)}`,
            },
          },
        },
      ],
    });
    try {
      const response = await clar.post(
        `v2/models/${process.env.MODEL_ID}/versions/${model.versionId}/outputs`,

        data,
      );
      console.log(response, 'RESPONSE');
      // if (response.data.status?.code === 21102) {
      //   return response.data.status.details;
      // }

      return response.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
  async deleteConcept(inputId, conceptId, user) {
    const data = JSON.stringify({
      user_app_id: {
        user_id: process.env.CLAR_USER_ID,
        app_id: process.env.APP_ID,
      },
      inputs: [
        {
          id: inputId,
          data: {
            concepts: [{ id: conceptId }],
          },
        },
      ],
      action: 'remove',
    });

    const response = await clar.patch(`v2/inputs`, data);
    if (response.data.status?.code === 21102) {
      return response.data.status.details;
    }

    return response.data;
  }
  catch(err) {
    console.log(err.respose.data.status);
  }

  async addNegativeConcept(body, id, user) {
    console.log('log');
  }
}
