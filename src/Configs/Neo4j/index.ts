import { ConfigService } from '@nestjs/config';

export async function neo4jConfigFactory(config: ConfigService) {
  return {
    host: config.get('NEO4J_HOST', 'localhost'),
    username: config.get('NEO4J_USERNAME', 'neo4j'),
    password: config.get('NEO4J_PASSWORD', 'test'),
    port: config.get('NEO4J_PORT', 7687),
  };
}
