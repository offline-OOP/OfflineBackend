import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EventsController } from '@src/events/events.controller';
import { EventsService } from '@src/events/events.service';
import { CaslModule } from '@src/casl/casl.module';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import EventsSchema from '@src/events/events.schema';
import UserSchema from '@src/users/users.schema';
import { GetEventMiddleware } from '@src/events/middleware/events.middleware';

@Module({
  imports: [
    CaslModule,
    NeodeModule.forFeature({ Event: EventsSchema, User: UserSchema }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetEventMiddleware)
      .forRoutes(
        { path: 'events/:id', method: RequestMethod.PUT },
        { path: 'events/:id', method: RequestMethod.DELETE },
      );
  }
}
