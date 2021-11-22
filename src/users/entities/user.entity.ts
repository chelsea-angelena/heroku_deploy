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
  iat: number;

  @Column({ nullable: true })
  exp: number;

  @Column({ nullable: true })
  azp: string;

  @Column({ nullable: true })
  scope: string;
}
