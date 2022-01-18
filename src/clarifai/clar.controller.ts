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
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../common/interface/request-user';
import { ModelService } from './services/model.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('clarifai')
export class ClarController {
  constructor(
    private readonly clarifaiService: ClarifaiService,
    private readonly modelService: ModelService,
  ) {}

  @Get('/inputs')
  async getInputs(@Req() req: RequestWithUser) {
    console.log('HELLO');
    return await this.clarifaiService.getInputs(req.user);
  }

  @Get('/model')
  async getModel(@Req() req: RequestWithUser) {
    return await this.clarifaiService.getModelInfo(req.user);
  }

  // @Get('/model')
  // async getModelById(@Req() req: RequestWithUser): Promise<Model[]> {
  //   return await this.modelService.findAll({
  //     where: { userId: req.user.id },
  //   });
  // }

  @Post('/inputs')
  async addInputs(@Body() body, @Req() req: RequestWithUser) {
    return await this.clarifaiService.addInputs(body, req.user);
  }

  @Post('/onlyInput')
  async onlyInputs(@Body() body, @Req() req: RequestWithUser) {
    return await this.clarifaiService.addInputs(body, req.user);
  }

  @Patch('/inputs/:id')
  async updateInput(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() body,
  ): Promise<any> {
    console.log(body, id, 'HYEEE');
    return await this.clarifaiService.updateInputs(body, id, req.user);
  }

  @Delete('/inputs/:id')
  async deleteInput(@Param('id') id: string) {
    return await this.clarifaiService.deleteInput(id);
  }

  @Post('/model')
  async createModel(@Body() body, @Req() req: RequestWithUser) {
    const response = await this.clarifaiService.createModel(body, req.user);

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
    return await this.clarifaiService.updateModel(conceptId, req.user);
  }

  @Post('/model/train')
  async trainModel(@Req() req: RequestWithUser) {
    console.log(req.user);
    return await this.clarifaiService.trainModel(req.user);
  }

  @Post('/predict')
  async predictWithModel(@Body() body, @Req() req: RequestWithUser) {
    const { base64 } = body;
    return await this.clarifaiService.predictWithModel(base64, req.user);
  }

  @Delete('/inputs/:inputId/concepts/:conceptId')
  async deleteConcept(@Param() params, @Req() req: RequestWithUser) {
    const { inputId, conceptId } = params;
    await this.clarifaiService.deleteConcept(inputId, conceptId, req.user);
  }
}
