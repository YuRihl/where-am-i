import { Location } from './location.interface';

export interface IGameResult {
  userLocation: Location | null;
  actualLocation: Location | null;
  roomId: string | null;
}
