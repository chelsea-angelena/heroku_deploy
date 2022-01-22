import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Concept } from './concept.entity';
import { Expose } from 'class-transformer';

@Entity('model')
export class Model extends BaseEntity {
  @Expose()
  @Column({ default: 'plant_id_model' })
  modelId: string;

  @Expose()
  @Column({ default: 'plant_id_model' })
  name: string;

  @Expose()
  @Column({ default: 'dbz5i3r2v8jt' })
  clarifaiUserId: string;

  @Expose()
  @Column({ default: 'plant_id' })
  appId: string;

  @Expose()
  @Column({ default: 'embedding-classifer' })
  modelType: string;

  @Expose()
  @Column({ nullable: true })
  versionId: string;

  @Expose()
  @Column({ nullable: true })
  status: string;

  @Expose()
  @ApiProperty()
  @OneToOne(() => User, (user) => user.model)
  @JoinColumn()
  user: User;

  @Expose()
  @OneToMany(() => Concept, (concepts) => concepts.model, { nullable: true })
  concepts: Concept[];
}
