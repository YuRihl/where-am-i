import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { IJwtConfig } from 'src/config/interfaces';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [UserModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const jwtConfig = configService.get<IJwtConfig>('jwt');

				return {
					secret: jwtConfig.secret,
					signOptions: { expiresIn: jwtConfig.expiresIn }
				}
			}
		})],
	providers: [AuthService],
	controllers: [AuthController]
})
export class AuthModule { }