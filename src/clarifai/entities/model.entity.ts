import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Concept } from './concept.entity';
import { Expose } from 'class-transformer';

@Entity('model')
export class Model extends BaseEntity {
  @Column()
  @Expose()
  @IsString()
  modelId: string;

  @Column()
  @Expose()
  @IsString()
  name: string;

  @Column()
  @Expose()
  @IsString()
  modifiedAt: string;

  @Column()
  @Expose()
  @IsString()
  modelType: string;

  @Column()
  appId: string;

  @Column()
  clarifaiUserId: string;

  @ManyToOne(() => User, (user) => user.models)
  @JoinColumn()
  user: User;

  @OneToMany(() => Concept, (concepts) => concepts.model, { nullable: true })
  concepts: Concept[];
}
