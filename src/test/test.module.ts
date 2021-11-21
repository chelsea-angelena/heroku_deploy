import { Module } from '@nestjs/common';
import { Test } from './entity/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [],
  providers: [],
})
export class TestModule {}
