import { Get, Req, UseGuards, Controller, Post, Body } from '@nestjs/common';
import { PlantIdService } from './plantId.service';
import { PlantIdDto } from './dto/plant-id.dto';
import { Response } from './interface/plantResponse.interface';
import { RequestWithUser } from '../common/interface/request-user';
import JwtAuthGuard from '../authz/jwt-auth.guard';

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
    return isSaved;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlants(@Req() request: RequestWithUser) {
    const userId = request.user.id;

    const response = await this.plantIdService.findAll({
      where: {
        userId: request.user.id,
      },
    });
    if (response) {
      return { response: response };
    }
  }
}
