import {
  Param,
  Delete,
  Get,
  Req,
  UseGuards,
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { PlantIdService } from './plantId.service';
import { PlantDto, PlantIdDto } from './dto/plant-id.dto';
import { Response } from './interface/plantResponse.interface';
import { RequestWithUser } from '../common/interface/request-user';
import JwtAuthGuard from '../authz/jwt-auth.guard';

@Controller('plants')
export class PlantIdController {
  constructor(private readonly plantIdService: PlantIdService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/identify')
  async identify(
    @Req() request: RequestWithUser,
    @Body() plantIdDto: PlantIdDto,
  ): Promise<Response> {
    const { base64 } = plantIdDto;

    return await this.plantIdService.identify(base64);
  }

  @Post()
  async savePlantResponse(
    @Req() request: RequestWithUser,
    @Body() plantDto: PlantDto,
  ): Promise<void> {
    await this.plantIdService.create({
      base64: plantDto.base64,
      response: plantDto.response,
      userId: request.user.userId,
    });
  }

  @Delete(':id')
  async deletePlant(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
  ): Promise<void> {
    await this.plantIdService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlants(@Req() request: RequestWithUser): Promise<Response[]> {
    const plants = await this.plantIdService.findAll();
    return plants;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPlantDetails(@Param('id') id: string): Promise<Response> {
    return await this.plantIdService.findOne(id);
  }
}
