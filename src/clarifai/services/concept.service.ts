import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../../common/abstract.service';
import { Concept } from '../entities/concept.entity';

@Injectable()
export class ConceptService extends AbstractService {
  constructor(
    @InjectRepository(Concept)
    private conceptRepository: Repository<Concept>,
  ) {
    super(conceptRepository);
  }
}
