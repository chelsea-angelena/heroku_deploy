import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PlantIdModule } from './plant-id/plantId.module';
import { UsersModule } from './users/users.module';
import { ClarifaiModule } from './clarifai/clarifai.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PlantIdModule,
    ClarifaiModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
