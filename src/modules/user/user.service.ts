import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) { }

	createUser(createUserDto: CreateUserDto) {
		return this.userRepository.createOne(createUserDto);
	}

	retrieveUsers(where: Prisma.UserWhereInput) {
		return this.userRepository.retrieveMany(where);
	}

	retrieveUserById(id: number) {
		return this.userRepository.retrieveOneById(id);
	}

	retrieveUserByEmailOrUsername(emailOrUsername: string): Promise<User> {
		return this.userRepository.retrieveOneByEmailOrUsername(emailOrUsername);
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
