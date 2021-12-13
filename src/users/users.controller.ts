import { Body, Req, Controller, Post, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../common/interface/request-user';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from '../users/dto/user.dto';
import { User } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(@Req() req: RequestWithUser): Promise<User> {
    const { user } = req;
    return user;
  }

  @Post('/appId')
  async createApp(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: RequestWithUser,
  ): Promise<void> {
    const { id } = request.user;
    return await this.usersService.update(id, updateUserDto);
  }
}
