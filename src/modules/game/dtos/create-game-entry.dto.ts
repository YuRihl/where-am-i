import { Prisma } from '@prisma/client';
import { IsInt, IsPositive } from 'class-validator';

export class CreateGameEntryDto {
  @IsPositive()
  @IsInt()
  userId: number;

  @IsPositive()
  @IsInt()
  gameId: number;

  static toGameEntry(dto: CreateGameEntryDto): Prisma.GameEntryCreateInput {
    return {
      user: { connect: { id: dto.userId } },
      game: { connect: { id: dto.gameId } },
    };
  }
}
