import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

export abstract class BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' })
  createdDate: Date;

  @Expose()
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: 'NOW()',
    nullable: true,
  })
  updatedDate: Date;
}
