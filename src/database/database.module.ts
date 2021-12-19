import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: process.env.MODE === 'heroku_deploy',

      extra: {
        ssl:
          process.env.MODE === 'heroku_deploy'
            ? { rejectUnauthorized: false }
            : null,
      },
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['**/*.entity.{js, ts}'],
      autoLoadEntities: true,
      synchronize: process.env.MODE === 'development',
    }),
  ],
})
export class DatabaseModule {}
