import { Module } from '@nestjs/common';
import { UsersService } from '#Services/Users';
import { NeodeModule } from '#Modules/Neo4j';
import UserSchema from '#Schemas/User';

@Module({
  imports: [NeodeModule.forFeature({ User: UserSchema })],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
