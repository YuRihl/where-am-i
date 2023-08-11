import { Injectable } from '@nestjs/common';
import { Map } from '@prisma/client';
import { CreateMapDto } from './dtos/create-map.dto';
import { UpdateMapDto } from './dtos/update-map.dto';
import { MapRepository } from './repositories';

@Injectable()
export class MapService {
  constructor(private readonly mapRepository: MapRepository) {}

  async createOne(createMapDto: CreateMapDto): Promise<Map> {
    return this.mapRepository.createOne(CreateMapDto.toMap(createMapDto));
  }

  async getAll(): Promise<Map[]> {
    return this.mapRepository.getAll();
  }

  async getById(id: number): Promise<Map> {
    return this.mapRepository.getById(id);
  }

  async updateById(id: number, updateMapDto: UpdateMapDto) {
    return this.mapRepository.updateById(id, UpdateMapDto.toMap(updateMapDto));
  }

  async deleteById(id: number): Promise<void> {
    await this.mapRepository.deleteById(id);
  }
}
