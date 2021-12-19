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
import { PlantId } from './entities/plant-id.entity';
import { Response } from './interface/plantResponse.interface';
import { RequestWithUser } from '../common/interface/request-user';
import JwtAuthGuard from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async savePlantResponse(
    @Req() request: RequestWithUser,
    @Body() plantDto: PlantDto,
  ): Promise<PlantId> {
    return await this.plantIdService.create({
      base64: plantDto.base64,
      response: plantDto.response,
      user: request.user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePlant(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.plantIdService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlants(@Req() request: RequestWithUser): Promise<PlantId[]> {
    return await this.plantIdService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPlantDetails(@Param('id') id: string): Promise<PlantId> {
    return await this.plantIdService.findOne({ id });
  }
}
