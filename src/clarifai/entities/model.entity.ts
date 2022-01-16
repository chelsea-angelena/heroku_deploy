import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Concept } from './concept.entity';
import { Expose } from 'class-transformer';

@Entity('model')
export class Model extends BaseEntity {
  @Expose()
  @Column({ default: 'clar_server_model_2' })
  modelId: string;

  @Expose()
  @Column({ default: 'clar_server_model_2' })
  name: string;

  @Expose()
  @Column({ nullable: true })
  modelType: string;

  @Expose()
  @Column({ nullable: true })
  versionId: string;

  @Expose()
  @ApiProperty()
  @OneToOne(() => User, (user) => user.model, { eager: true })
  @JoinColumn()
  user: User;

  @Expose()
  @OneToMany(() => Concept, (concepts) => concepts.model, { nullable: true })
  concepts: Concept[];
}
