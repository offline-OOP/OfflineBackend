import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { DbWaitCommand } from '@src/wait-db.command';
import { AppController } from '@src/app/app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mailerConfigFactory } from '@src/mailer/mailer.config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '@src/auth/auth.module';
import { UsersModule } from '@src/users/users.module';
import { FriendsModule } from '@src/friends/friends.module';
import { EventsModule } from '@src/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: mailerConfigFactory,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FriendsModule,
    EventsModule,
    CommandModule,
    LoggerModule.forRoot(),
  ],
  providers: [DbWaitCommand],
  controllers: [AppController],
})
export class Index {}
