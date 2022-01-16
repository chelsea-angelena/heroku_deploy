import { JoinColumn, ManyToOne, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Response } from '../interface/plantnet-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Expose } from 'class-transformer';

@Entity('plant_id')
export class PlantNet extends BaseEntity {
  @ApiProperty()
  @Expose()
  @Column({ type: 'json', nullable: true })
  response?: Response;

  @ApiProperty()
  @Column()
  @Expose()
  filename: string;

  @ApiProperty()
  @Column()
  @Expose()
  url: string;

  @ApiProperty()
  @Column()
  @Expose()
  path: string;

  @ApiProperty()
  @Expose()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  userId: User;
}
