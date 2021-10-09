import { Module } from '@nestjs/common';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import UserSchema from '@src/users/users.schema';
import { FriendsService } from '@src/friends/friends.service';
import { FriendsController } from '@src/friends/friends.controller';

@Module({
  imports: [NeodeModule.forFeature({ User: UserSchema })],
  providers: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
