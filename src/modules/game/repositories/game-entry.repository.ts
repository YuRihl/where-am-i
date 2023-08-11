import { Injectable } from '@nestjs/common';
import { Game, GameEntry, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameEntryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(gameEntry: Prisma.GameEntryCreateInput): Promise<GameEntry> {
    return this.prismaService.gameEntry.create({
      data: gameEntry,
      include: { game: true, user: true },
    });
  }

  async getAllByUserId(
    userId: number,
  ): Promise<(GameEntry & { game: Game })[]> {
    return this.prismaService.gameEntry.findMany({
      where: { userId },
      include: { game: true, user: true },
    });
  }
}
