import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole } from '../user/enums';
import { UserService } from '../user/user.service';
import { AccessTokenDto, LoginUserDto, PayloadDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<AccessTokenDto> {
    const user = await this.userService.getByEmailOrUsername(
      loginUserDto.emailOrUsername,
    );

    const isPasswordMatching = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credentials provided');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        ...PayloadDto.toDto(user),
      }),
    };
  }

  public async signUp(createUserDto: CreateUserDto): Promise<AccessTokenDto> {
    const hashSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, hashSalt);

    try {
      const createdUser = await this.userService.createOne({
        ...createUserDto,
        password: hashedPassword,
        roles: [UserRole.USER],
      });

      return {
        accessToken: await this.jwtService.signAsync({
          ...PayloadDto.toDto(createdUser),
        }),
      };
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async handleGoogleAuth(
    createUserDto: CreateUserDto,
  ): Promise<AccessTokenDto> {
    try {
      const user = await this.userService.getByEmailOrUsername(
        createUserDto.email,
      );

      return {
        accessToken: await this.jwtService.signAsync({
          ...PayloadDto.toDto(user),
        }),
      };
    } catch (error) {
      const createdUser = await this.userService.createOne({
        ...createUserDto,
        roles: [UserRole.USER],
      });

      return {
        accessToken: await this.jwtService.signAsync({
          ...PayloadDto.toDto(createdUser),
        }),
      };
    }
  }
}
