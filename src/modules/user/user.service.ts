import { Injectable } from '@nestjs/common';
import { GameEntry, Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createOne(CreateUserDto.toUser(createUserDto));
  }

  async getAll(
    where: Prisma.UserWhereInput,
  ): Promise<(User & { games: GameEntry[] })[]> {
    return this.userRepository.getManyBy(where);
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<User> {
    return this.userRepository.getByEmailOrUsername(emailOrUsername);
  }

  async getByWebsocketId(websocketId: string): Promise<User> {
    return this.userRepository.getByWebsocketId(websocketId);
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateOne(
      id,
      UpdateUserDto.toUser(updateUserDto),
    );
  }

  // deleteById(id: number): Promise<void> {
  //   return `This action removes a #${id} user`;
  // }
}
