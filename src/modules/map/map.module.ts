import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MapRepository } from './repositories';

@Module({
  imports: [PrismaModule],
  controllers: [MapController],
  providers: [MapService, MapRepository],
})
export class MapModule {}
