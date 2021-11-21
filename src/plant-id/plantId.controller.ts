import { Inject, Controller, Injectable, Post, Body } from '@nestjs/common';
import { PlantIdService } from './plantId.service';
import { PlantIdDto } from './dto/plant-id.dto';

@Controller('identify')
export class PlantIdController {
  constructor(private readonly plantIdService: PlantIdService) {}

  @Post()
  async identifyPlant(@Body() plantIdDto: PlantIdDto): Promise<any> {
    const { base64 } = plantIdDto;
    return await this.plantIdService.identify(base64);
  }
}
