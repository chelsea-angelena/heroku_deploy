import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Test } from './test/entity/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async getHello(): Promise<Test[]> {
    try {
      const test = await this.testRepository.find();
      if (test) {
        return test;
      } else {
        return [
          { id: '7897wehuiwqh', name: 'test1' },
          { id: '6127836hijh', name: 'test2' },
        ];
      }
    } catch (err) {
      throw new NotFoundException('No Tests found');
    }
  }
}
