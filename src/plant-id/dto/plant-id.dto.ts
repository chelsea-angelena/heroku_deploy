import { ApiProperty } from '@nestjs/swagger';
import { Response } from '../interface/plantResponse.interface';
import { IsString } from 'class-validator';

export class PlantIdDto {
  @ApiProperty()
  @IsString()
  base64: string;
}

export class PlantDto {
  @ApiProperty()
  @IsString()
  base64: string;
  @ApiProperty()
  response: Response;
}
