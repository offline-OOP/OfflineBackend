import { Module } from '@nestjs/common';
import { EventsController } from '@src/events/events.controller';
import { EventsService } from '@src/events/events.service';
import { CaslModule } from '@src/casl/casl.module';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import EventsSchema from '@src/events/events.schema';
import UserSchema from '@src/users/users.schema';

@Module({
  imports: [
    CaslModule,
    NeodeModule.forFeature({ Event: EventsSchema, User: UserSchema }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
