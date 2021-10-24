import { Inject, Injectable } from '@nestjs/common';
import Neode from 'neode';
import { CaslEventsAbilityFactory } from '@src/casl/casl-events-ability.factory';
import {
  CreateLineupInterface,
  RemoveLineupInterface,
  UpdateLineupInterface,
} from '@src/lineups/interfaces/lineups.service.interfaces';
import { EventsService } from '@src/events/events.service';
import { Action } from '@src/generic.interface';
import { uuid } from 'uuidv4';
import { FullLineupInterface } from '@src/lineups/interfaces/lineup.interface';

@Injectable()
export class LineupsService {
  constructor(
    @Inject('Connection') private readonly neode: Neode,
    private caslEventsAbilityFactory: CaslEventsAbilityFactory,
    private eventsService: EventsService,
  ) {}

  async create(params: CreateLineupInterface) {
    const id: string = uuid();
    const eventOwnerId = await this.eventsService.getOwnerId(params.eventId);

    await this.caslEventsAbilityFactory.hasAbility(
      params.user,
      Action.MANAGE,
      eventOwnerId,
    );

    const createLineupQuery = `
      MATCH (e: Event {id: $eventId})
      CREATE (l: Lineup $lineup)
      CREATE (e)-[rel:LINEUP]->(l)
    `;
    await this.neode.cypher(createLineupQuery, {
      eventId: params.eventId,
      lineup: params.lineup,
    });

    return { id };
  }

  async update(params: UpdateLineupInterface) {
    const eventOwnerId = await this.eventsService.getOwnerId(params.eventId);

    await this.caslEventsAbilityFactory.hasAbility(
      params.user,
      Action.MANAGE,
      eventOwnerId,
    );

    const lineup = await this.neode.merge<FullLineupInterface>(
      'Lineup',
      params.lineup,
    );

    return lineup.toJson();
  }

  async remove(params: RemoveLineupInterface) {
    const eventOwnerId = await this.eventsService.getOwnerId(params.eventId);

    await this.caslEventsAbilityFactory.hasAbility(
      params.user,
      Action.MANAGE,
      eventOwnerId,
    );

    const query = this.neode.query();
    const lineupModel = this.neode.model('Lineup');

    await query
      .match('lineup', lineupModel)
      .where('lineup.id', params.lineupId)
      .detachDelete('lineup')
      .execute();
  }
}
