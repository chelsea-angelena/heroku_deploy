import { OneToMany, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Model } from '../../clarifai/entities/model.entity';
import { Transform, Expose } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Expose()
  @Column({ nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  sub: string;

  @Column({ nullable: true })
  iat: number;

  @Column({ nullable: true })
  exp: number;

  @Column({ nullable: true })
  azp: string;

  @Column({ nullable: true })
  scope: string;

  @Expose()
  @Column({ nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  appId: string;

  @Expose()
  @Column({ nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  userId: string;

  @OneToMany(() => Model, (models) => models.user)
  models: Model[];
}
