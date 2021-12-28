import { OneToMany, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Model } from '../../clarifai/entities/model.entity';
import { Transform, Expose } from 'class-transformer';
import { PlantId } from '../../plant-id/entities/plant-id.entity';
import { PlantNet } from '../../plantnet/entities/plantnet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @Expose()
  @Column({ nullable: true })
  sub: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  appId: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  userId: string;

  @ApiProperty()
  @OneToMany(() => Model, (models) => models.user)
  models: Model[];

  @ApiProperty()
  @OneToMany(() => PlantId, (plants) => plants.user)
  plants: PlantId[];

  @ApiProperty()
  @OneToMany(() => PlantNet, (plantNet) => plantNet)
  plantNet: PlantNet[];
}
