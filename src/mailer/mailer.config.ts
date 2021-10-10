import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import * as fs from 'fs';

export async function mailerConfigFactory(config: ConfigService) {
  const params: any = {
    transport: {
      host: config.get('MAIL_HOST', 'localhost'),
      port: config.get('MAIL_PORT', 1025),
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    },
    defaults: {
      from: `"No Reply" <${config.get('MAIL_FROM', 'offline-bot@mail.ru')}>`,
    },
    template: {
      dir: join(process.cwd(), 'src', 'Mail', 'Templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };

  const mailPassword =
    config.get('NODE_ENV') === 'production'
      ? fs
          .readFileSync('/run/secrets/neo4j_password')
          .toString()
          .replace(/\\n/g, '')
      : config.get('MAIL_PASSWORD');

  if (config.get('MAIL_USER') && mailPassword) {
    params.auth = {
      user: config.get('MAIL_USER'),
      pass: mailPassword,
    };
  }

  return params;
}
