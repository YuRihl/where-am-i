import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Request } from 'express';
import { Roles } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { ReturnUserDto } from './dto';
import { UserRole } from './enums';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllUsers(where: Prisma.UserWhereInput): Promise<User[]> {
    try {
      return await this.userService.getAll(where);
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<ReturnUserDto> {
    try {
      return ReturnUserDto.toReturnUserDto(req.user as User);
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User> {
    try {
      return await this.userService.getById(id);
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(error);
    }
  }

  // @Patch(':id')
  // async updateUserById(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User> {
  //   try {
  //     return await this.userService.updateById(id, updateUserDto);
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  // @Delete(':id')
  // async deleteUserById(
  //   @Param('id', new ParseIntPipe()) id: number,
  // ): Promise<void> {
  //   try {
  //     await this.userService.deleteById(id);
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
}
