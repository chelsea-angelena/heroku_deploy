import { Inject, Controller, Injectable, Post, Body } from '@nestjs/common';
import { PlantIdService } from './plantId.service';
import { PlantIdDto } from './dto/plant-id.dto';
import { Response } from './interface/plantResponse.interface';

@Controller('identify')
export class PlantIdController {
  constructor(private readonly plantIdService: PlantIdService) {}

  @Post()
  async identifyPlant(@Body() plantIdDto: PlantIdDto): Promise<any> {
    const { base64 } = plantIdDto;
    const response: Response = await this.plantIdService.identify(base64);

    await this.plantIdService.create({ base64, response });

    return response;
  }
}
