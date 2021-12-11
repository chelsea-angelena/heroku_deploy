import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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

  async update(id, body) {
    const user = await this.usersRepository.findOne(id);

    user.appId = body.appId;
    user.userId = body.userId;
    return await this.usersRepository.save(user);
  }

  async getAuthenticatedUser(payload: TokenPayload): Promise<any> {
    const { sub } = payload;
    const user = await this.usersRepository.findOne({
      where: { sub: sub },
    });
    if (!user) {
      const newUser = await this.usersRepository.create({ sub: sub });
      await this.usersRepository.save(newUser);
      const savedUser = await this.usersRepository.findOne({
        where: { sub: newUser.sub },
      });

      return newUser;
    }
    return user;
  }
}
