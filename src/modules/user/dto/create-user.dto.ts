import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { constants } from '../constants';
import { UserRole } from '../enums';

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
  @IsOptional()
  @MinLength(constants.password.minLength)
  @MaxLength(constants.password.maxLength)
  password?: string;

  @IsBoolean()
  @IsOptional()
  isRegisteredWithGoogle?: boolean;

  @IsString()
  @MinLength(constants.firstName.minLength)
  @MaxLength(constants.firstName.maxLength)
  firstName!: string;

  @IsString()
  @MinLength(constants.lastName.minLength)
  @MaxLength(constants.lastName.maxLength)
  lastName!: string;

  @IsEnum(UserRole, { each: true })
  roles!: UserRole[];

  static toUser(dto: CreateUserDto): Prisma.UserCreateInput {
    return {
      username: dto.username,
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      roles: {
        createMany: { data: dto.roles.map((role) => ({ name: role })) },
      },
      isRegisteredWithGoogle: dto.isRegisteredWithGoogle,
    };
  }
}
