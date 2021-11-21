import { ApiProperty } from '@nestjs/swagger';

export class PlantIdDto {
  @ApiProperty()
  base64: string;
}
