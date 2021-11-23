import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PlantIdModule } from './plant-id/plantId.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClarifaiModule } from './clarifai/clarifai.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    PlantIdModule,
    ClarifaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
