import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import { GameTimeConstants } from './enums/game-time-constants.enum';
import { GameService } from './game.service';
import { IGameResult } from './interfaces/result.interface';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedPlayers: Socket[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly gameService: GameService,
  ) {}

  handleConnection(socket: Socket) {
    console.log('Connected to web socket ' + socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Disconnected from web socket ${socket.id}`);

    this.connectedPlayers = this.connectedPlayers.filter(
      (player) => player !== socket,
    );
  }

  @SubscribeMessage('add_websocket')
  async onAddWebsocket(
    @MessageBody() userId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.userService.updateById(userId, { websocketId: socket.id });
  }

  @SubscribeMessage('find_room')
  async onFindRoom(
    @MessageBody() body: { userId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    this.connectedPlayers.push(socket);
    const { roomId, opponent } = this.findOpponent(socket);

    const user = await this.userService.getByWebsocketId(socket.id);
    const opponentUser = await this.userService.getByWebsocketId(opponent?.id);

    //this.server.emit('room_created', { roomId, userId: user.id });

    //const randomLocation = await this.gameService.getRandomPanorama();

    this.server.to(roomId).emit('room_created', {
      roomId,
      userId: opponentUser.id,
      //randomLongitude: randomLocation.location.latLng.lng(),
      //randomLatitude: randomLocation.location.latLng.lat(),
    });

    return this.server.to(socket.id).emit('room_created', {
      roomId,
      userId: user.id,
      //randomLongitude: randomLocation.location.latLng.lng(),
      //randomLatitude: randomLocation.location.latLng.lat(),
    });
  }

  @SubscribeMessage('finished')
  async onFinished(
    @MessageBody() body: { finished: boolean; roomId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    socket.to(body.roomId).emit('other_player_finished', {
      remainingTimeInSeconds: GameTimeConstants.REMAINING_TIME_IN_SECONDS,
    });

    //const game = await this.gameService.updateById(body);
  }

  @SubscribeMessage('result')
  async onResult(
    @MessageBody() body: IGameResult,
    @ConnectedSocket() socket: Socket,
  ) {
    const points = this.gameService.calculatePoints(
      body.userLocation,
      body.actualLocation,
    );

    const sockets = this.server.sockets.sockets.keys();
    const firstUserSocketId = sockets.next().value;
    const secondUserSocketID = sockets.next().value;

    const currentUserSocketId =
      firstUserSocketId === socket.id ? firstUserSocketId : secondUserSocketID;
    const opponentUserSocketId =
      currentUserSocketId === firstUserSocketId
        ? secondUserSocketID
        : firstUserSocketId;

    const user = await this.userService.getByWebsocketId(currentUserSocketId);
    const opponent = await this.userService.getByWebsocketId(
      opponentUserSocketId,
    );

    const game = await this.gameService.createOne({
      name: `${user.username} against ${
        opponent.username
      }: ${Date.now().toString()}`,
      result: +points.toFixed(0),
      mapId: 1,
    });

    await this.gameService.createGameEntry({
      userId: user.id,
      gameId: game.id,
    });

    return this.server
      .to(socket.id)
      .emit('result_received', { points: +points.toFixed(0) });
  }

  findOpponent(socket: Socket): { roomId: string; opponent: Socket } {
    const opponent = this.connectedPlayers.find((player) => player !== socket);

    if (opponent) {
      this.connectedPlayers = this.connectedPlayers.filter(
        (player) => player !== socket && player !== opponent,
      );

      const roomId = uuidv4();
      socket.join(roomId);
      opponent.join(roomId);

      return { roomId, opponent };
    } else {
      return this.findOpponent(socket);
    }
  }
}
