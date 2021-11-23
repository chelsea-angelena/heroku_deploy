import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(payload) {
    const { iss, sub, iat, exp, azp, scope } = payload;
    const findUser = {
      sub,
    };
    const user = await this.usersRepository.findOne({ where: findUser });
    if (!user) {
      const user = await this.usersRepository.create(payload);
      await this.usersRepository.save(user);
    }
    return user;
  }
}
