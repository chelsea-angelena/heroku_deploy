import { Injectable } from '@nestjs/common';
import { clar } from '../clar.api';
import { ModelService } from './model.service';
@Injectable()
export class ClarifaiService {
  constructor(private readonly modelService: ModelService) {}

  async getInputs(user): Promise<any> {
    try {
      const { data } = await clar.get(
        `v2/users/me/apps/${user.appId}/inputs?page=1&per_page=10`,
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
        user_id: user.userId,
        app_id: user.appId,
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
      console.log(err.respose.data.status);
    }
  }

  public async addOnlyInputs(body, user) {
    const data = JSON.stringify({
      user_app_id: {
        user_id: user.userId,
        app_id: user.appId,
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
        user_id: user.userId,
        app_id: user.appId,
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
        user_id: user.userId,
        app_id: user.appId,
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
    console.log(user, 'USER');

    const model = await this.modelService.findOne({
      where: { user: user },
    });

    if (model) {
      const { data } = await clar.get(
        `/v2/users/me/apps/${user.appId}/models/${model.modelId}`,
      );
      console.log(data);
      return data;
    }

    if (!model) {
      const newModel = await this.modelService.create({
        user,
      });
      console.log(newModel, 'NEW MODEL');
      const { data } =
        newModel &&
        (await clar.get(
          `/v2/users/me/apps/${user.appId}/models/${newModel.modelId}`,
        ));
      return data;
    }
  }

  public async updateModel(conceptId: string, user) {
    const ModelPatchData = {
      user_app_id: {
        user_id: user.userId,
        app_id: user.appId,
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

  async trainModel(user) {
    try {
      const model = await this.modelService.findOne({
        where: { user },
      });
      console.log(model);

      const { data } = await clar.post(
        `/v2/users/me/apps/${user.appId}/models/${model.modelId}/versions`,
      );
      console.log(data, 'DATA');
      const updated =
        data &&
        (await this.modelService.update(model.id, {
          versionId: data?.model.model_version.id,
        }));
      console.log(updated, 'UPDATED');
      const modelUpdate = await this.modelService.findOne({
        where: { user },
      });
      return modelUpdate;
    } catch (err) {
      console.log(err.response);
    }
  }

  public async predictWithModel(base64, user) {
    const model = await this.modelService.findOne({ where: { user: user } });
    const data = JSON.stringify({
      user_app_id: {
        user_id: user.userId,
        app_id: user.appId,
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
        `v2/models/${model.modelId}/versions/${model.versionId}/outputs`,

        data,
      );
      if (response.data.status?.code === 21102) {
        return response.data.status.details;
      }

      return response.data;
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }
}
