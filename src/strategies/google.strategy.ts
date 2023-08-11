import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGoogleConfig } from 'src/config/interfaces';
import { CreateUserDto } from 'src/modules/user/dto';
import { UserRole } from 'src/modules/user/enums';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<IGoogleConfig>('google').auth.id,
      clientSecret: configService.get<IGoogleConfig>('google').auth.secret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, displayName } = profile;
    const user: CreateUserDto = {
      username: displayName,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      roles: [UserRole.USER],
      isRegisteredWithGoogle: true,
    };

    done(null, user);

    return user;
  }
}
