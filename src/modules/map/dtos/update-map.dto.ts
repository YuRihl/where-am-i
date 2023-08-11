import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateMapDto } from './create-map.dto';

export class UpdateMapDto extends PartialType(CreateMapDto) {
  static toMap(dto: UpdateMapDto): Prisma.MapUpdateInput {
    return {
      name: dto.name,
      countryCode: dto.countryCode,
    };
  }
}
