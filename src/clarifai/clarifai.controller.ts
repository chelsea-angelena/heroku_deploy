import {
  Body,
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ClarifaiService } from './clarifai.service';
import { CreateModelDto } from './dto/createModel.dto';
import { AddInputsDto, UpdateInputsDto } from './dto/inputs.dto';
import { PredictDto } from './dto/predict.dto';

@Controller('clarifai')
export class ClarifaiController {
  constructor(private readonly clarifaiService: ClarifaiService) {}

  @Get('inputs')
  async getInputs() {
    return await this.clarifaiService.getInputs();
  }

  @Post('inputs')
  async addInputs(@Body() addInputsDto: AddInputsDto) {
    return await this.clarifaiService.addInputs(addInputsDto);
  }

  @Patch('inputs/:id')
  async updateInput(@Param('id') id: string, @Body('concept') concept: string) {
    const updateDto: UpdateInputsDto = {
      id,
      concept,
    };

    return await this.clarifaiService.updateInputs(updateDto);
  }

  @Delete('inputs/:id')
  async deleteInput(@Param('id') id: string) {
    const response = await this.clarifaiService.deleteInput(id);
    return response;
  }

  @Post('model')
  async createModel(@Body() createModelDto: CreateModelDto) {
    return await this.clarifaiService.createModel(createModelDto);
  }

  @Patch('model')
  async updateModel(@Body('conceptId') conceptId: string) {
    const response = await this.clarifaiService.updateModel(conceptId);
    return response;
  }

  @Post('model/train')
  async trainModel() {
    return await this.clarifaiService.trainModel();
  }

  @Post('predict')
  async predictWithModel(@Body() predictDto: PredictDto) {
    return await this.clarifaiService.predictWithModel(predictDto);
  }
}
