import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async findAll(criteria?: any | null): Promise<any[]> {
    return await this.repository.find(criteria);
  }

  async findOne(id): Promise<any> {
    return await this.repository.findOne(id);
  }

  async create(data): Promise<any> {
    const newEntity = await this.repository.create(data);
    return await this.repository.save(newEntity);
  }

  async update(id, data): Promise<any> {
    return await this.repository.update(id, data);
  }

  async delete(id): Promise<void> {
    await this.repository.delete(id);
  }
}
