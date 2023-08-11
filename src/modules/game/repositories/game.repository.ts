import { Injectable } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class GameRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(game: Prisma.GameCreateInput): Promise<Game> {
    return this.prismaService.game.create({ data: game });
  }
}
