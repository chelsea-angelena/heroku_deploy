import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  sub: string;

  @Expose()
  userId: string;

  @Expose()
  appId: string;
}
