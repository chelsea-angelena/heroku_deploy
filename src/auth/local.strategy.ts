import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { TokenPayload } from 'src/users/interface/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(payload: TokenPayload): Promise<User> {
    return this.userService.getAuthenticatedUser(payload);
  }
}
