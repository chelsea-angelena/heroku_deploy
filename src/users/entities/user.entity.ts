import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  iss: string;

  @Column({ nullable: true })
  sub: string;

  @Column({ nullable: true })
<<<<<<< HEAD
  iat: number;

  @Column({ nullable: true })
  exp: number;

  @Column({ nullable: true })
=======
>>>>>>> 6bd5b5c (added dependenccies)
  azp: string;

  @Column({ nullable: true })
  scope: string;
}
