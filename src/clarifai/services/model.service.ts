import { Injectable } from '@nestjs/common';
import { Model } from '../entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../../common/abstract.service';

@Injectable()
export class ModelService extends AbstractService {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {
    super(modelRepository);
  }
}
