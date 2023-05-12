import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserRepository {
	constructor(private readonly prismaService: PrismaService) { }

	async retrieveOneById(id: number): Promise<User> {
		return this.prismaService.user.findUniqueOrThrow({ where: { id } });
	}

	async retrieveOneByEmailOrUsername(emailOrUsername: string): Promise<User> {
		return this.prismaService.user.findFirstOrThrow({
			where: {
				OR: [{ username: emailOrUsername }, { email: emailOrUsername }]
			}
		});
	}

	async retrieveMany(where: Prisma.UserWhereInput): Promise<User[]> {
		return this.prismaService.user.findMany({ where });
	}

	async createOne(createUserDto: CreateUserDto) {
		return this.prismaService.user.create({
			data: CreateUserDto.toUser(createUserDto)
		});
	}
}