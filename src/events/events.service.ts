import { HttpException, Inject, Injectable } from '@nestjs/common';
import Neode from 'neode';
import { FullEventInterface } from '@src/events/interfaces/events.interface';
import {
  CreateEventInterface,
  UpdateEventInterface,
  RemoveEventInterface,
  FindOneInterface,
} from '@src/events/interfaces/events.service.interfaces';
import { uuid } from 'uuidv4';

@Injectable()
export class EventsService {
  constructor(@Inject('Connection') private readonly neode: Neode) {}

  async create(params: CreateEventInterface) {
    const id: string = uuid();
    const createEventQuery = `
      MATCH (u: User {id: $userId})
      CREATE (e: Event $event)
      CREATE (u)-[rel:OWNER]->(e)
    `;
    await this.neode.cypher(createEventQuery, {
      userId: params.ownerId,
      event: { ...params.event, id },
    });

    return { id };
  }

  async update(params: UpdateEventInterface) {
    const event = await this.neode.mergeOn<FullEventInterface>(
      'Event',
      { id: params.eventId },
      params.event,
    );

    return event.toJson();
  }

  async remove(params: RemoveEventInterface) {
    const query = this.neode.query();
    const eventModel = this.neode.model('Event');

    await query
      .match('event', eventModel)
      .where('event.id', params.eventId)
      .detachDelete('event')
      .execute();
  }

  async findOne(params: FindOneInterface) {
    const event = await this.neode.first<FullEventInterface>(
      'Event',
      'id',
      params.eventId,
    );

    if (!event) {
      throw new HttpException('Event not found', 404);
    }

    return event.toJson();
  }
}
