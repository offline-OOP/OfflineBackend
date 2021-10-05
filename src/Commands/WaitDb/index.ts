import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Neode from 'neode';

@Injectable()
export class DbWaitCommand {
  private tries = 100;
  constructor(
    private connection: Connection,
    @Inject('Connection') private readonly neode: Neode,
  ) {}

  @Command({
    command: 'db:wait',
    describe: 'wait for db to up',
  })
  async wait() {
    await this.waitMysql();
    await this.waitNeo4j();

    process.exit(0);
  }

  private async waitMysql() {
    for (let i = 0; i < this.tries; i++) {
      try {
        console.log('Checking connection to mysql');
        await this.connection.query('SHOW TABLES');
        break;
      } catch (e) {
        console.log(e);
      }

      await this.sleep(5000);
    }
  }

  private async waitNeo4j() {
    for (let i = 0; i < this.tries; i++) {
      try {
        console.log('Checking connection to neo4j');
        await this.neode.find('User', '-1');
        break;
      } catch (e) {
        console.log(e);
      }

      await this.sleep(5000);
    }
  }

  private sleep(ms = 1000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
