import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PlantIdModule } from './plant-id/plantId.module';
import { UsersModule } from './users/users.module';
import { ClarifaiModule } from './clarifai/clarifai.module';
import { AuthModule } from './auth/auth.module';
import { PlantNetModule } from './plantnet/plantnet.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PlantNetModule,
    PlantIdModule,
    ClarifaiModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
