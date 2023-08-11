import { IsLatitude, IsLongitude } from 'class-validator';

export class LocationDto {
  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
