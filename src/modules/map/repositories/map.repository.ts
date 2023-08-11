import { Injectable } from '@nestjs/common';
import { Map, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MapRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(map: Prisma.MapCreateInput): Promise<Map> {
    return this.prismaService.map.create({ data: map });
  }

  async getAll(): Promise<Map[]> {
    return this.prismaService.map.findMany();
  }

  async getById(id: number): Promise<Map> {
    return this.prismaService.map.findUnique({ where: { id } });
  }

  async updateById(id: number, map: Prisma.MapUpdateInput): Promise<Map> {
    return this.prismaService.map.update({ where: { id }, data: map });
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.map.delete({ where: { id } });
  }
}
