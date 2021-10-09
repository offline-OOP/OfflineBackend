import { ConfigService } from '@nestjs/config';

export async function jwtConfigFactory(configService: ConfigService) {
  return {
    secret: configService.get('JWT_KEY'),
  };
}
