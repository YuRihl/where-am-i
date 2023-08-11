import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configure } from 'src/config/config';
import { validate } from 'src/config/config.validator';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configure],
      validate,
    }),
    GameModule,
    MapModule,
  ],
})
export class AppModule {}
