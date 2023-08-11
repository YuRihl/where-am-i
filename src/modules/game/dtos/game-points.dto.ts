import { IsLatitude, IsLongitude } from 'class-validator';

export class GamePointsDto {
  @IsLongitude()
  userLocationLongitude: number;

  @IsLatitude()
  userLocationLatitude: number;

  @IsLongitude()
  actualLocationLongitude: number;

  @IsLatitude()
  actualLocationLatitude: number;
}
