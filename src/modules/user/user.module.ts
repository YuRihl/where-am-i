import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService, UserRepository],
	imports: [PrismaModule]
})
export class UserModule { }