import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export async function mailerConfigFactory(config: ConfigService) {
  return {
    transport: {
      host: config.get('MAIL_HOST', 'smtp.mail.ru'),
      port: config.get('MAIL_PORT', 25),
      secure: false,
      auth: {
        user: config.get('MAIL_USER'),
        pass: config.get('MAIL_PASSWORD'),
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
}
