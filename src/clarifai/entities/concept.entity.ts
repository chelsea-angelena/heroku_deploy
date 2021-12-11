import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Model } from './model.entity';

@Entity('concept')
export class Concept extends BaseEntity {
  @Column()
  concept: string;

  @ManyToOne(() => Model, (model) => model.concepts, { nullable: true })
  @JoinColumn()
  model: Model;
}
