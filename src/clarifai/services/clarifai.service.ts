import { Injectable } from '@nestjs/common';
import { clar } from '../clar.api';

@Injectable()
export class ClarifaiService {
  modelId = process.env.MODEL_ID;
  versionId = process.env.VERSION_ID;
  userId = process.env.USER_ID;
  appId = process.env.APP_ID;
  constructor() {}

  public async getInputs(): Promise<any> {
    return await clar.get('/v2/inputs');
  }

  public async addInputs(body) {
    const data = {
      user_app_id: {
        user_id: this.userId,
        app_id: this.appId,
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

  public async addOnlyInputs(body) {
    const data = JSON.stringify({
      user_app_id: {
        user_id: this.userId,
        app_id: this.appId,
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

      return response.data;
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }

  public async deleteInput(id: string) {
    const { data } = await clar.delete(`/v2/inputs/${id}`);
    return data;
  }

  public async updateInputs(body, id) {
    const sendData = JSON.stringify({
      user_app_id: {
        user_id: this.userId,
        app_id: this.appId,
      },
      inputs: [
        {
          id: id,
          data: {
            concepts: [
              {
                id: body.concept.text,
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

  async createModel(body) {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: this.userId,
        app_id: this.appId,
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

  public async getModelInfo() {
    try {
      const { data } = await clar.get(
        `/v2/users/me/apps/${this.appId}/models/${this.modelId}`,
      );

      return data;
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }

  public async updateModel(conceptId: string) {
    const ModelPatchData = {
      user_app_id: {
        user_id: this.userId,
        app_id: this.appId,
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

  public trainModel() {
    clar.post(
      `/v2/users/me/apps/${this.appId}/models/${this.modelId}/versions`,
    );
  }

  public async predictWithModel(body) {
    const data = JSON.stringify({
      user_app_id: {
        user_id: this.userId,
        app_id: this.appId,
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
      const response = await clar.post(
        `v2/models/${this.modelId}/versions/${this.versionId}/outputs`,

        data,
      );
      if (response.data.status?.code === 21102) {
        return response.data.status.details;
      }
      if (response.data.status?.code === 10000) {
        return response.data;
      }
    } catch (err) {
      console.log(err.respose.data.status);
    }
  }
}
