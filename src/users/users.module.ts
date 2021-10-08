import { Module } from '@nestjs/common';
import { UsersService } from '@src/users/users.sevice';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import UserSchema from '@src/users/users.schema';

@Module({
  imports: [NeodeModule.forFeature({ User: UserSchema })],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
