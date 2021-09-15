import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DbWaitCommand {
  private tries = 100;
  constructor(private connection: Connection) {}

  @Command({
    command: 'db:wait',
    describe: 'wait for db to up',
  })
  async wait() {
    for (let i = 0; i < this.tries; i++) {
      try {
        await this.connection.query('SHOW TABLES');
        break;
      } catch (e) {
        console.log(e);
      }

      await this.sleep(5000);
    }

    process.exit(0);
  }

  private sleep(ms = 1000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
