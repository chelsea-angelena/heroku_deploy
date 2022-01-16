import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @IsString()
  @ApiProperty()
  id: string;

  @Expose()
  @IsString()
  @ApiProperty()
  sub: string;

  @Expose()
  @IsString()
  @ApiProperty()
  userId: string;

  @Expose()
  @IsString()
  @ApiProperty()
  appId: string;
}

export class UpdateUserDto extends UserDto {}
