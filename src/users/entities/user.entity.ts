import { OneToOne, OneToMany, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Model } from '../../clarifai/entities/model.entity';
import { Expose } from 'class-transformer';
import { PlantId } from '../../plant-id/entities/plant-id.entity';
import { PlantNet } from '../../plantnet/entities/plantnet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  sub: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  appId: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  userId: string;

  @Expose()
  @ApiProperty()
  @OneToOne(() => Model, (model) => model.user, { nullable: true })
  model: Model;

  @ApiProperty()
  @OneToMany(() => PlantId, (plants) => plants.user)
  plants: PlantId[];

  @ApiProperty()
  @OneToMany(() => PlantNet, (plantNet) => plantNet)
  plantNet: PlantNet[];
}
