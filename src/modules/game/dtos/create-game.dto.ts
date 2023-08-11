import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { GamePoints } from '../enums';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(GamePoints.MINIMUM_POINTS)
  @Max(GamePoints.MAXIMUM_POINTS)
  result: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  winnerId?: number;

  @IsPositive()
  @IsInt()
  mapId: number;

  static toGame(dto: CreateGameDto): Prisma.GameCreateInput {
    return {
      name: dto.name,
      result: dto.result,
      map: { connect: { id: dto.mapId } },
    };
  }
}
