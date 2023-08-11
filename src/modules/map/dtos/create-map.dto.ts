import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMapDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;

  static toMap(dto: CreateMapDto): Prisma.MapCreateInput {
    return {
      name: dto.name,
      countryCode: dto.countryCode,
    };
  }
}
