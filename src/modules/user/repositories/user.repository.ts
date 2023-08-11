import { Injectable } from '@nestjs/common';
import { GameEntry, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: number): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { roles: true },
    });
  }

  async getByEmailOrUsername(emailOrUsername: string): Promise<User> {
    return this.prismaService.user.findFirstOrThrow({
      where: {
        OR: [{ username: emailOrUsername }, { email: emailOrUsername }],
      },
      include: { roles: true },
    });
  }

  async getByWebsocketId(websocketId: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { websocketId } });
  }

  async getManyBy(
    where: Prisma.UserWhereInput,
  ): Promise<(User & { games: GameEntry[] })[]> {
    return this.prismaService.user.findMany({
      where,
      include: { roles: true, games: true },
    });
  }

  async createOne(user: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  async updateOne(id: number, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      include: { roles: true },
      where: { id },
      data: user,
    });
  }
}
