import {} from '@googlemaps/js-api-loader';
import { Controller, Get, Query } from '@nestjs/common';
import { GamePointsDto } from './dtos';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('result')
  async getGamePoints(
    @Query() gamePointsDto: GamePointsDto,
  ): Promise<{ points: number }> {
    const points = this.gameService.calculatePoints(
      {
        lng: gamePointsDto.userLocationLongitude,
        lat: gamePointsDto.userLocationLatitude,
      },
      {
        lng: gamePointsDto.actualLocationLongitude,
        lat: gamePointsDto.actualLocationLatitude,
      },
    );

    return { points: +points.toFixed(0) };
  }

  @Get('ratings')
  async getRatings(): Promise<any> {
    return this.gameService.getRatings();
  }
}
