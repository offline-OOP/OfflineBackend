import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Auth/auth.module';
import { UsersModule } from 'src/User/user.module';
import { CommandModule } from 'nestjs-command';
import { DbWaitCommand } from '#Commands/WaitDb';
import { AppController } from 'src/App/app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mysqlConfigFactory } from './Configs/mysql-config';
import { mailerConfigFactory } from './Configs/mailer-config';
import { LoggerModule } from 'nestjs-pino';

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
