import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { Logger } from '@nestjs/common';

const logger = new Logger('AuthService');
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { githubId: profile.githubId },
      });

      if (user) {
        return user;
      }

      const newUser = await this.prisma.user.create({
        data: {
          githubId: profile.githubId,
          email: profile.email || `no-email-${profile.githubId}@github.com`,
          name: profile.name,
          avatarUrl: profile.avatarUrl,
          role: Role.FREELANCER,
        },
      });

      return newUser;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Error validating OAuth login');
    }
  }

  login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatarUrl,
        role: user.role,
      },
    };
  }
}
