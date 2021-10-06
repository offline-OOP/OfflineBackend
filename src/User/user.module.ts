import { Module } from '@nestjs/common';
import { UsersService } from 'src/user/user.sevice';
import { NeodeModule } from 'src/neo4j/neo4j.module';
import UserSchema from 'src/user/Schemas/user.schema';

@Module({
  imports: [NeodeModule.forFeature({ User: UserSchema })],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
