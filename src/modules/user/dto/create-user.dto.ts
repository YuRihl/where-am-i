import { Prisma } from '@prisma/client';
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { constants } from "../constants";
import { UserRole } from "../enums";


export class CreateUserDto {
	@IsString()
	@MinLength(constants.username.minLength)
	@MaxLength(constants.username.maxLength)
	username!: string;

	@IsEmail()
	@MinLength(constants.email.minLength)
	@MaxLength(constants.email.maxLength)
	email!: string;

	@IsString()
	@MinLength(constants.password.minLength)
	@MaxLength(constants.password.maxLength)
	password!: string;

	@IsString()
	@MinLength(constants.firstName.minLength)
	@MaxLength(constants.firstName.maxLength)
	firstName!: string;

	@IsString()
	@MinLength(constants.lastName.minLength)
	@MaxLength(constants.lastName.maxLength)
	lastName!: string;

	@IsEnum(UserRole, { each: true })
	roles: UserRole[];

	static toUser(dto: CreateUserDto): Prisma.UserCreateInput {
		return {
			username: dto.username,
			email: dto.email,
			password: dto.password,
			first_name: dto.firstName,
			last_name: dto.lastName,
			roles: { createMany: { data: dto.roles.map(role => ({ name: role })) } }
		}
	}
}
