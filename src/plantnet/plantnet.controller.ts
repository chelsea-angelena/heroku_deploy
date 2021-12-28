import {
  Req,
  UseGuards,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlantNetService } from './plantnet.service';
import { CreatePlantNetUploadDto } from './dto/plantnet.dto';
import { RequestWithUser } from '../common/interface/request-user';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import * as faker from 'faker';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('plantnet')
export class PlantNetController {
  constructor(private readonly plantNetService: PlantNetService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/identify')
  @UseInterceptors(
    // TO DO - move to cloud service
    FileInterceptor('image', {
      storage: diskStorage({
        destination: `./uploads`,
        filename(_, file, cb) {
          const randomFilename = `${faker.random
            .word()
            .toLowerCase()}-${faker.random.word().toLowerCase()}`;
          return cb(null, `${randomFilename}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file, @Req() request: RequestWithUser) {
    const baseUrl = 'http://localhost:5002/api';
    const createPlantNetUploadDto: CreatePlantNetUploadDto = {
      filename: file.filename,
      url: `${baseUrl}/${file.path}`,
      userId: request.user.id,
      path: file.path,
    };

    return await this.plantNetService.identify(createPlantNetUploadDto);
  }
}
