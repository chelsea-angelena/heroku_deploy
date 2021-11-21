import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Test } from './test.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<Test[]> {
    return await this.appService.getHello();
  }
}
