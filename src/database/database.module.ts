import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// const dotenv = require('dotenv');
// dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: process.env.MODE === 'production',
      extra: {
        ssl:
          process.env.MODE === 'production'
            ? { rejectUnauthorized: false }
            : null,
      },
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
