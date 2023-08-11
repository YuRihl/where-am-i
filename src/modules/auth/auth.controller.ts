import {
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from 'src/guards';
import { CreateUserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.signIn(loginUserDto);
    } catch (error) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException(
              `User with username or email ${loginUserDto.emailOrUsername} not found`,
            );
        }
      }

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(error);
    }
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(error);
    }
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const accessToken = await this.authService.handleGoogleAuth(
        req.user as CreateUserDto,
      );

      res
        .cookie('access_token', accessToken.accessToken)
        .redirect('http://localhost:5173/home');
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(error);
    }
  }
}
