import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LineupsController } from './lineups.controller';
import { LineupsService } from './lineups.service';
import { CaslModule } from '@src/casl/casl.module';
import { EventsService } from '@src/events/events.service';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import EventsSchema from '@src/events/events.schema';
import UserSchema from '@src/users/users.schema';
import LineupsSchema from '@src/events/lineups/lineups.schema';
import { GetEventWithLineupMiddleware } from '@src/events/lineups/middleware/lineups.middleware';
import { GetEventMiddleware } from '@src/events/middleware/events.middleware';

@Module({
  imports: [
    CaslModule,
    NeodeModule.forFeature({
      Event: EventsSchema,
      User: UserSchema,
      Lineup: LineupsSchema,
    }),
  ],
  controllers: [LineupsController],
  providers: [LineupsService, EventsService],
})
export class LineupsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetEventWithLineupMiddleware)
      .forRoutes(
        { path: 'events/:eventId/lineups/:id', method: RequestMethod.PUT },
        { path: 'events/:eventId/lineups/:id', method: RequestMethod.DELETE },
      );
  }
}
