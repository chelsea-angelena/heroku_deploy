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
import { BaseResponse } from './ro/clarifai.ro';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('clarifai')
export class ClarController {
  constructor(private readonly clarifaiService: ClarifaiService) {}

  @Post('/inputs')
  async addInputs(@Body() body): Promise<unknown> {
    console.log('POST INPUT');
    return await this.clarifaiService.addInputs(body);
  }

  @Patch('/inputs/:id')
  async updateInput(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() body,
  ): Promise<any> {
    return await this.clarifaiService.updateInputs(body, id);
  }

  @Get('/inputs')
  async getInputs(): Promise<InputResponse> {
    console.log('GET INPUT');
    return await this.clarifaiService.getInputs();
  }

  @Delete('/inputs/:id')
  async deleteInput(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<BaseResponse> {
    console.log('DELETE INPUT');
    const response = await this.clarifaiService.deleteInput(id);
    return response;
  }

  /* Model endpoints */

  @Post('/model/train')
  async trainModel(@Req() req: RequestWithUser): Promise<unknown> {
    console.log('TRAIN MODEL');
    this.clarifaiService.trainModel();
    return 'Model is training - wait 10 mins then refresh';
  }

  @Post('/predict')
  async predictWithModel(@Body() body): Promise<unknown> {
    console.log('PREDICT WITH MODEL', body);
    return await this.clarifaiService.predictWithModel(body);
  }

  @Patch('/model')
  async addConcept(
    @Body('conceptId') conceptId: string,
    @Req() req: RequestWithUser,
  ): Promise<unknown> {
    console.log('UPDATE MODEL');
    return await this.clarifaiService.updateModel(conceptId);
  }

  @Get('/model')
  async getModel(@Req() req: RequestWithUser): Promise<unknown> {
    console.log('GET MODEL');

    return await this.clarifaiService.getModelInfo();
  }
}
