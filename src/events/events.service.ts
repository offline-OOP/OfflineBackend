import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Action } from '@src/generic.interface';
import { CaslEventsAbilityFactory } from '@src/casl/casl-events-ability.factory';
import Neode from 'neode';
import { FullEventInterface } from '@src/events/interfaces/events.interface';
import { CreateEventInterface } from '@src/events/interfaces/create-event.interface';
import { UpdateEventInterface } from '@src/events/interfaces/update-event.interface';
import { RemoveEventInterface } from '@src/events/interfaces/remove-event.interface';
import { FindOneInterface } from '@src/events/interfaces/find-one.interface';
import { uuid } from 'uuidv4';

@Injectable()
export class EventsService {
  constructor(
    @Inject('Connection') private readonly neode: Neode,
    private caslEventsAbilityFactory: CaslEventsAbilityFactory,
  ) {}

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
    const ownerId = await this.getOwnerId(params.eventId);

    await this.caslEventsAbilityFactory.hasAbility(
      params.user,
      Action.UPDATE,
      ownerId,
    );

    const event = await this.neode.merge<FullEventInterface>(
      'Event',
      params.event,
    );

    return event.toJson();
  }

  async remove(params: RemoveEventInterface) {
    const ownerId = await this.getOwnerId(params.eventId);

    await this.caslEventsAbilityFactory.hasAbility(
      params.user,
      Action.DELETE,
      ownerId,
    );

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

  private async getOwnerId(eventId: string) {
    const query = this.neode.query();
    const eventModel = this.neode.model('Event');
    const userModel = this.neode.model('User');

    const res = await query
      .match('event', eventModel)
      .where('event.id', eventId)
      .relationship('OWNER', 'in', 'rel', 1)
      .to('owner', userModel)
      .return('owner')
      .execute();

    if (res.records.length) {
      return res.records[0].get('owner').properties.id;
    }

    return undefined;
  }
}
