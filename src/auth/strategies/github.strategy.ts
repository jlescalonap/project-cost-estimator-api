import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // Aquí recibimos los datos de GitHub
    const { id, username, photos, emails } = profile;

    // Normalizamos los datos para nuestro sistema
    const user = {
      githubId: id,
      email: emails?.[0]?.value,
      name: username, // O profile.displayName
      avatarUrl: photos?.[0]?.value,
      accessToken, // Útil si queremos llamar a la API de GitHub después
    };

    return user; // Esto se inyectará en el objeto Request (req.user)
  }
}
