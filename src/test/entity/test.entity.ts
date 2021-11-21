import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public name: string;
}
