import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '#Entities/User';

export class users1632252237294 implements MigrationInterface {
  name = 'users1632252237294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`app\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email_confirmed\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    const user = new User();
    user.firstName = 'admin';
    user.lastName = 'admin';
    user.email = 'admin@example.com';
    user.password = 'JKHGY76bhwDW';
    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`app\`.\`users\``);
  }
}
