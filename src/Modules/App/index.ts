import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '#Modules/Auth';
import { UsersModule } from '#Modules/User';
import { CommandModule } from 'nestjs-command';
import { DbWaitCommand } from '#Commands/WaitDb';
import { AppController } from '#Controllers/App';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mysqlConfigFactory } from '#Configs/Mysql';
import { mailerConfigFactory } from '#Configs/Mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFactory: mysqlConfigFactory,
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: mailerConfigFactory,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CommandModule,
  ],
  providers: [DbWaitCommand],
  controllers: [AppController],
})
export class Index {}
