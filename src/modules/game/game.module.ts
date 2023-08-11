import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameEntryRepository } from './repositories/game-entry.repository';
import { GameRepository } from './repositories/game.repository';

@Module({
  controllers: [GameController],
  imports: [UserModule, PrismaModule],
  providers: [GameGateway, GameService, GameRepository, GameEntryRepository],
})
export class GameModule {}
