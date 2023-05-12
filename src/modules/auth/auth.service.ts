import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessTokenDto, LoginUserDto, PayloadDto } from '../dtos';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole } from '../user/enums';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService) { }

	async signIn(loginUserDto: LoginUserDto): Promise<AccessTokenDto> {
		const user = await this.userService.retrieveUserByEmailOrUsername(loginUserDto.usernameOrEmail);

		const isPasswordMatching = await bcrypt.compare(
			loginUserDto.password,
			user.password
		);

		if (!isPasswordMatching) {
			throw new UnauthorizedException('Wrong credentials provided');
		}

		return { accessToken: await this.jwtService.signAsync({ ...PayloadDto.toDto(user) }), }
	}

	public async signUp(createUserDto: CreateUserDto): Promise<AccessTokenDto> {
		const hashSalt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(createUserDto.password, hashSalt);

		try {
			const createdUser = await this.userService.createUser({
				...createUserDto,
				password: hashedPassword,
				roles: [UserRole.USER]
			});

			return { accessToken: await this.jwtService.signAsync({ ...PayloadDto.toDto(createdUser) }), }
		} catch (error) {
			console.error(error);

			throw error;
		}
	}
}