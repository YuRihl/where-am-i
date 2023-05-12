import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	retrieveUsers(where: Prisma.UserWhereInput) {
		try {
			return this.userService.retrieveUsers(where);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	@Get(':id')
	findOne(@Param('id', new ParseIntPipe()) id: number) {
		try {
			return this.userService.retrieveUserById(id);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
