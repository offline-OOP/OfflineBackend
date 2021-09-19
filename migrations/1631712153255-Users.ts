import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '#Entities/User';

export class Users1631712153255 implements MigrationInterface {
  name = 'Users1631712153255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`app\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
