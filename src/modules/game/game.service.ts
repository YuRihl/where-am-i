import { Loader } from '@googlemaps/js-api-loader';
import { Injectable } from '@nestjs/common';
import { Game, GameEntry } from '@prisma/client';
import { getDistance } from 'geolib';
import { UserService } from '../user/user.service';
import { CreateGameDto } from './dtos';
import { CreateGameEntryDto } from './dtos/create-game-entry.dto';
import { DistanceConstants } from './enums';
import { GamePoints } from './enums/game-points.enum';
import { LocationLimit } from './enums/location-limit.enum';
import { Location } from './interfaces/location.interface';
import { GameEntryRepository } from './repositories/game-entry.repository';
import { GameRepository } from './repositories/game.repository';

@Injectable()
export class GameService {
  private loader: Loader;

  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gameEntryRepository: GameEntryRepository,
    private readonly usersService: UserService,
  ) {
    this.loader = new Loader({
      apiKey: 'AIzaSyD8nJq9whnNKikp9H6VimOnILX7sNfKEzE',
    });
  }

  async createOne(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createOne(CreateGameDto.toGame(createGameDto));
  }

  async createGameEntry(
    createGameEntryDto: CreateGameEntryDto,
  ): Promise<GameEntry> {
    return this.gameEntryRepository.createOne(
      CreateGameEntryDto.toGameEntry(createGameEntryDto),
    );
  }

  async getRatings(): Promise<any> {
    const users = await this.usersService.getAll({});

    const userAllPoints = users.map(async (user) => {
      console.log(user);
      const games = await this.gameEntryRepository.getAllByUserId(user.id);

      console.log(games);

      const pointsSum = games
        .map((game) => game.game.result)
        .reduce((prev, current) => prev + current, 0);

      return { ...user, summaryPoints: pointsSum };
    });

    const awaitedUserAllPoints = await Promise.all(userAllPoints);

    return awaitedUserAllPoints.sort(
      (first, second) => second.summaryPoints - first.summaryPoints,
    );
  }

  calculatePoints(userLocation: Location, actualLocation: Location) {
    if (!userLocation) {
      return 0;
    }

    if (!actualLocation) {
      return 0;
    }

    console.log(userLocation, 'USER');
    console.log(actualLocation, 'ACTUAL');
    const distance =
      getDistance(
        {
          lng: userLocation.lng,
          lat: userLocation.lat,
        },
        { lng: actualLocation.lng, lat: actualLocation.lat },
      ) / DistanceConstants.METERS_IN_KILOMETER;

    console.log('DISTANCE', distance);

    const points =
      GamePoints.MAXIMUM_POINTS *
      Math.pow(Math.E, -distance / GamePoints.POINTS_CONSTANT);

    return points;
  }

  async getRandomPanorama(): Promise<google.maps.StreetViewPanoramaData> {
    await this.loader.importLibrary('streetView');

    const service = new window.google.maps.StreetViewService();

    const randomLocation = this.getRandomLocation();

    let randomPanorama: google.maps.StreetViewResponse;
    try {
      randomPanorama = await service.getPanorama({
        location: randomLocation,
        preference: google.maps.StreetViewPreference.NEAREST,
        radius: 200,
      });

      return randomPanorama.data;
    } catch (error) {
      return this.getRandomPanorama();
    }
  }

  getRandomLocation(): google.maps.LatLng {
    const longitude =
      Math.random() * (LocationLimit.MAX_LNG - LocationLimit.MIN_LNG) +
      LocationLimit.MIN_LNG;
    const latitude =
      Math.random() * (LocationLimit.MAX_LAT - LocationLimit.MIN_LAT) +
      LocationLimit.MIN_LAT;

    return new google.maps.LatLng(latitude, longitude);
  }
}
