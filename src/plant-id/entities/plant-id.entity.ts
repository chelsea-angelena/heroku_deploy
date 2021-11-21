import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Response } from '../interface/plantResponse.interface';

@Entity('plant_id')
export class PlantId extends BaseEntity {
  @Column()
  base64: string;

  @Column({ type: 'json' })
  response: Response;
}
