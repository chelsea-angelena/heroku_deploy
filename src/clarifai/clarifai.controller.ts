import {
  Body,
  Req,
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ClarifaiService } from './services/clarifai.service';
import JwtAuthGuard from '../authz/jwt-auth.guard';
import { RequestWithUser } from '../common/interface/request-user';
import { ModelService } from './services/model.service';
import { BaseResponse } from './ro/clarifai.ro';
import { Logger } from '../logs/Logger';
import { Model } from './entities/model.entity';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('clarifai')
export class ClarifaiController {
  constructor(
    private readonly clarifaiService: ClarifaiService,
    private readonly modelService: ModelService,
  ) {}

  @Get('/inputs')
  async getInputs(@Req() req: RequestWithUser) {
    Logger.info(`[GET]: clarifai/inputs, [USER]: ${req.user.id}`);
    const { data } = await this.clarifaiService.getInputs();
    const { inputs } = data;
    return inputs;
  }

  @Get('/model/:appId/:id')
  async getModel(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Param('appId') appId: string,
  ) {
    Logger.info(`[GET]: clarifai/modelId, [USER]: ${req.user.id}`);

    return await this.clarifaiService.getModelInfo();
  }

  @Get('/model')
  async getModelById(@Req() req: RequestWithUser): Promise<Model[]> {
    Logger.info(`[GET]: clarifai/model, [USER]: ${req.user.id}`);
    return await this.modelService.findAll({
      where: { userId: req.user.id },
    });
  }

  @Post('/inputs')
  async addInputs(@Body() body, @Req() req: RequestWithUser) {
    Logger.info(`[POST]: clarifai/inputs, [USER]: ${req.user.id}`);

    return await this.clarifaiService.addInputs(body);
  }

  @Post('/onlyInput')
  async onlyInputs(@Body() body, @Req() req: RequestWithUser) {
    const { user } = req;
    return await this.clarifaiService.addInputs(body);
  }

  @Patch('/inputs/:id')
  async updateInput(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() body,
  ): Promise<any> {
    Logger.info(`[PATCH]: clarifai/inputs/${id}, [USER]: ${req.user.id}`);
    return await this.clarifaiService.updateInputs(body, id);
  }

  @Delete('/inputs/:id')
  async deleteInput(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<BaseResponse> {
    Logger.info(`[DELETE]:  clarifai/inputs/${id}, [USER]: ${req.user.id}`);
    const response = await this.clarifaiService.deleteInput(id);
    return response;
  }

  @Post('/model')
  async createModel(@Body() body, @Req() req: RequestWithUser) {
    Logger.info(
      `[POST]:  clarifai/model, [USER]: ${req.user.id}, [DATA]:

      }`,
    );

    const response = await this.clarifaiService.createModel(body);

    const newModel = {
      userId: req.user.id,
      modelId: response.data.model.id,
      name: response.data.model.name,
      appId: response.data.model.app_id,
      modelType: response.data.model.model_type_id,
    };
    return await this.modelService.create(newModel);
  }

  @Patch('/model')
  async updateModel(
    @Body('conceptId') conceptId: string,
    @Req() req: RequestWithUser,
  ) {
    Logger.info(`[PATCH]:  clarifai/model, [USER]: ${req.user.id}`);
    return await this.clarifaiService.updateModel(conceptId);
  }

  @Post('/model/train')
  async trainModel(@Req() req: RequestWithUser) {
    Logger.info(`[POST]:  clarifai/model/train, [USER]: ${req.user.id}`);

    this.clarifaiService.trainModel();
    return 'Model is training - wait 10 mins then refresh';
  }

  @Post('/predict')
  async predictWithModel(@Body() body) {
    Logger.info(`[POST]:  clarifai/predict`);
    return await this.clarifaiService.predictWithModel(body);
  }
}
