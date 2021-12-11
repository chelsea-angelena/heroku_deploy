import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// const dotenv = require('dotenv');
// dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: { rejectUnauthorized: false },
      //  process.env.MODE === 'heroku_deploy',
      // extra: {
      //   ssl: { rejectUnauthorized: false },
      // process.env.MODE === 'heroku_deploy'
      //   ? { rejectUnauthorized: false }
      //   : null,
      // },
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
