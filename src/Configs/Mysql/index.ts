import { ConfigService } from '@nestjs/config';
import { User } from '#Entities/User';

export async function mysqlConfigFactory(config: ConfigService) {
  return {
    type: 'mysql',
    host: config.get('MYSQL_HOST', 'localhost'),
    port: config.get('MYSQL_PORT', 3306),
    username: config.get('MYSQL_USERNAME', 'app'),
    password: config.get('MYSQL_PASSWORD', 'app'),
    database: config.get('MYSQL_DATABASE', 'app'),
    entities: [User],
  };
}
