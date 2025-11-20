import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, username, photos, emails } = profile;

    const rawUser = {
      githubId: id,
      email: emails?.[0]?.value,
      name: username,
      avatarUrl: photos?.[0]?.value,
      accessToken,
    };

    return this.authService.validateOAuthLogin(rawUser);
  }
}
