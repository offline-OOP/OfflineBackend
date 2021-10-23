import { Injectable, NestMiddleware } from '@nestjs/common';
import { EventsService } from '@src/events/events.service';
import { AuthenticatedUserRequest } from '@src/generic.interface';
import { NextFunction, Response } from 'express';
import { EventEntity } from '@src/events/events.entity';

@Injectable()
export class GetEventMiddleware implements NestMiddleware {
  constructor(private eventsService: EventsService) {}

  async use(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    const event = await this.eventsService.findOne({
      eventId: req.params.id,
    });

    if (!req.data) req.data = {};

    req.data.event = new EventEntity({
      ...event,
      //@ts-ignore
      owner: event.owner.node,
    });

    next();
  }
}
