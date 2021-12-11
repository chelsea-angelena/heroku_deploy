import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Concept } from './concept.entity';
import { Expose } from 'class-transformer';

@Entity('model')
export class Model extends BaseEntity {
  @Expose()
  @Column()
  modelId: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  appId: string;

  @Expose()
  @Column()
  modelType: string;

  @Expose()
  @Column()
  userId: string;

  @Expose()
  @ApiProperty()
  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  @Expose()
  @OneToMany(() => Concept, (concepts) => concepts.model)
  concepts: Concept[];
}
