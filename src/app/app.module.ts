import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { DbWaitCommand } from './waitDB.commands';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mysqlConfigFactory } from './mysql-config';
import { mailerConfigFactory } from './mailer-config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '#Auth/auth.module';
import { UsersModule } from '#User/user.module';

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
    LoggerModule.forRoot(),
  ],
  providers: [DbWaitCommand],
  controllers: [AppController],
})
export class Index {}
