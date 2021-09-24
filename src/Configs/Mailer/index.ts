import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

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

  if (config.get('MAIL_USER') && config.get('MAIL_PASSWORD')) {
    params.auth = {
      user: config.get('MAIL_USER'),
      pass: config.get('MAIL_PASSWORD'),
    };
  }

  return params;
}
