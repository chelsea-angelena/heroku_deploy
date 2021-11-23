import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('model')
export class Model extends BaseEntity {
  @Column()
  model_id: string;

  @Column()
  concept: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  userId: User;
}
