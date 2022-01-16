import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/user.dto';
import { TokenPayload } from './interface/user';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class UsersService extends AbstractService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user: User = await this.usersRepository.findOne(id);

    user.appId = updateUserDto.appId;
    user.userId = updateUserDto.userId;

    await this.usersRepository.save(user);
  }

  async getAuthenticatedUser(payload: TokenPayload): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { sub: payload.sub },
    });
    if (!user) {
      const newUser = await this.usersRepository.create({ sub: payload.sub });
      await this.usersRepository.save(newUser);
      const savedUser = await this.usersRepository.findOne({
        where: { sub: newUser.sub },
      });
      return newUser;
    }
    return user;
  }
}
