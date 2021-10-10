import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get('NODE_ENV') === 'production'
          ? fs
              .readFileSync('/run/secrets/jwt_key')
              .toString()
              .replace(/\\n/g, '')
          : configService.get('JWT_KEY'),
    });
  }

  async validate(payload: { name: string; id: string }) {
    return { name: payload.name, id: payload.id };
  }
}
