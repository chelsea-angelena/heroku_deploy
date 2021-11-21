import { Inject, Controller, Injectable, Post, Body } from '@nestjs/common';
import { PlantIdService } from './plantId.service';

@Controller('identify')
export class PlantIdController {
  constructor(private readonly plantIdService: PlantIdService) {}

  @Post()
  async identifyPlant(@Body() body) {
    return await this.plantIdService.identify(body);
  }
}
