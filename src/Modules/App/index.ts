import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#Entities/User';
import { AuthModule } from '#Modules/Auth';
import { UsersModule } from '#Modules/User';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 3306,
      username: process.env.DATABASE_USERNAME || 'test',
      password: process.env.DATABASE_PASSWORD || 'test',
      database: process.env.DATABASE_NAME || 'test',
      entities: [User],
    }),
    AuthModule,
    UsersModule,
    CommandModule,
  ],
})
export class Index {}
