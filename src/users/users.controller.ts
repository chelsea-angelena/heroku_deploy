import {
  Session,
  Body,
  UseInterceptors,
  Req,
  Controller,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../authz/jwt-auth.guard';
import { RequestWithUser } from '../common/interface/request-user';
import { UsersService } from 'src/users/users.service';

import { UserDto } from '../users/dto/user.dto';

import { User } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('/appId')
  async createApp(@Body() body, @Req() request: RequestWithUser) {
    return await this.usersService.update(request.user.id, body);
  }
}
