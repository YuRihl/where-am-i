
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtConfig } from 'src/config/interfaces';
import { PayloadDto } from 'src/modules/dtos/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<IJwtConfig>('jwt').secret,
		});
	}

	async validate(payload: PayloadDto) {
		return { userId: payload.sub, username: payload.username };
	}
}