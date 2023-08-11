import { User } from '@prisma/client';

export class ReturnUserDto {
  id: number;
  username: string;
  email: string;
  password: string | null;
  isRegisteredWithGoogle: boolean;
  firstName: string;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;

  static toReturnUserDto(user: User): ReturnUserDto {
    const dto = new ReturnUserDto();

    dto.id = user.id;
    dto.username = user.username;
    dto.email = user.email;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.isRegisteredWithGoogle = user.isRegisteredWithGoogle;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;

    return dto;
  }
}
