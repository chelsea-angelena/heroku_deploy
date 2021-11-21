import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [DatabaseModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
