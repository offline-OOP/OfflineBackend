import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#Entities/User';
import { AuthModule } from '#Modules/Auth';
import { UsersModule } from '#Modules/User';
import { CommandModule } from 'nestjs-command';
import { DbWaitCommand } from '#Commands/WaitDb';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 3306,
      username: process.env.DATABASE_USERNAME || 'app',
      password: process.env.DATABASE_PASSWORD || 'app',
      database: process.env.DATABASE_NAME || 'app',
      entities: [User],
    }),
    AuthModule,
    UsersModule,
    CommandModule,
  ],
  providers: [DbWaitCommand],
})
export class Index {}
