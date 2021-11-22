import { JoinColumn, ManyToOne, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Response } from '../interface/plantResponse.interface';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('plant_id')
export class PlantId extends BaseEntity {
  @ApiProperty()
  @Column()
  base64: string;

  @ApiProperty()
  @Column({ type: 'json' })
  response: Response;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  userId: User;
}
