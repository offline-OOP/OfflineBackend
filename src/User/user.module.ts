import { Module } from '@nestjs/common';
import { UsersService } from 'src/User/user.sevice';
import { NeodeModule } from 'src/Neo4j/neo4j.module';
import UserSchema from 'src/User/Schemas/user.schema';

@Module({
  imports: [NeodeModule.forFeature({ User: UserSchema })],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
