import { JoinColumn, ManyToOne, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Response } from '../interface/plantResponse.interface';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Expose } from 'class-transformer';

@Entity('plant_id')
export class PlantId extends BaseEntity {
  @ApiProperty()
  @Column()
  @Expose()
  base64: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'json' })
  response: Response;

  @ApiProperty()
  @Expose()
  @ManyToOne(() => User, (user) => user.plants)
  @JoinColumn()
  user: User;
}
