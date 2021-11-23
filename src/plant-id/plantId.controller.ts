import {
  HttpCode,
  Req,
  UseGuards,
  Inject,
  Controller,
  Injectable,
  Post,
  HttpException,
  Body,
} from '@nestjs/common';
import { PlantIdService } from './plantId.service';
import { PlantIdDto } from './dto/plant-id.dto';
import { Response } from './interface/plantResponse.interface';
import { RequestWithUser } from '../auth/guards/requestWithUser.interface';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@Controller('identify')
export class PlantIdController {
  constructor(private readonly plantIdService: PlantIdService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async identify(
    @Req() request: RequestWithUser,
    @Body() plantIdDto: PlantIdDto,
  ): Promise<Response> {
    const { base64 } = plantIdDto;
    const userId = request.user.id;
    const isSaved = await this.plantIdService.findOne({
      where: { userId: userId, base64: base64 },
    });
    if (!isSaved) {
      const response: Response = await this.plantIdService.identify(base64);
      await this.plantIdService.create({
        base64,
        response,
        userId,
      });

      return response;
    }
    const { response } = isSaved;
    return response;
  }
}
