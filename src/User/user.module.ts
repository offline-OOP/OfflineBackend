import { Module } from '@nestjs/common';
import { UsersService } from './user.sevice';
import { NeodeModule } from '../neo4j/neo4j.module';
import UserSchema from './Schemas/user.schema';

@Module({
  imports: [NeodeModule.forFeature({ User: UserSchema })],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
