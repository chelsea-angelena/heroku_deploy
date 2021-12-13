import { OneToMany, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Model } from '../../clarifai/entities/model.entity';
import { Transform, Expose } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Expose()
  @Column({ nullable: true })
  sub: string;

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
