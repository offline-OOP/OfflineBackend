import { Inject, Injectable } from '@nestjs/common';
import Neode from 'neode';
import {
  CreateLineupInterface,
  RemoveLineupInterface,
  UpdateLineupInterface,
} from '@src/events/lineups/interfaces/lineups.service.interfaces';
import { uuid } from 'uuidv4';
import { FullLineupInterface } from '@src/events/lineups/interfaces/lineup.interface';

@Injectable()
export class LineupsService {
  constructor(@Inject('Connection') private readonly neode: Neode) {}

  async create(params: CreateLineupInterface) {
    const id: string = uuid();
    const createLineupQuery = `
      MATCH (e: Event {id: $eventId})
      CREATE (l: Lineup {id: $id, datetime: $lineupDateTime, address: $lineupAddress, coordinates: Point($lineupCoordinates)})
      CREATE (e)-[rel:LINEUP]->(l)
    `;

    await this.neode.cypher(createLineupQuery, {
      eventId: params.eventId,
      id,
      lineupDateTime: params.lineup.datetime,
      lineupAddress: params.lineup.address,
      lineupCoordinates: params.lineup.coordinates,
    });

    return { id };
  }

  async update(params: UpdateLineupInterface) {
    const lineup = await this.neode.mergeOn<FullLineupInterface>(
      'Lineup',
      { id: params.lineupId },
      params.lineup,
    );

    return lineup.toJson();
  }

  async remove(params: RemoveLineupInterface) {
    const query = this.neode.query();
    const lineupModel = this.neode.model('Lineup');

    await query
      .match('lineup', lineupModel)
      .where('lineup.id', params.lineupId)
      .detachDelete('lineup')
      .execute();
  }
}
