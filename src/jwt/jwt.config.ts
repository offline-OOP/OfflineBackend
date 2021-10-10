import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

export async function jwtConfigFactory(configService: ConfigService) {
  console.log(
    'key: ',
    fs.readFileSync('/run/secrets/jwt_key').toString().replace(/\\n/g, ''),
  );
  return {
    secret:
      configService.get('NODE_ENV') === 'production'
        ? fs.readFileSync('/run/secrets/jwt_key').toString().replace(/\\n/g, '')
        : configService.get('JWT_KEY'),
  };
}
