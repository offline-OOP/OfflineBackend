import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  SendFriendRequestInterface,
  AcceptFriendRequestInterface,
  AreFriendsInterface,
} from '@src/friends/interfaces/frineds.service.interfaces';
import Neode from 'neode';

@Injectable()
export class FriendsService {
  constructor(@Inject('Connection') private readonly neode: Neode) {}

  async friendRequestExists(
    params: SendFriendRequestInterface,
  ): Promise<boolean> {
    const userModel = this.neode.model('User');
    const query = this.neode.query();
    const friendRequestRelationRes = await query
      .match('initiator', userModel)
      .where('initiator.id', params.initiatorUserId)
      .relationship('FRIEND_REQUEST', 'direction_both', 'rel', 1)
      .to('recipient', userModel)
      .where('recipient.id', params.recipientUserId)
      .return('initiator', 'rel', 'recipient')
      .execute();

    return !!friendRequestRelationRes.records.length;
  }

  async areFriends(params: AreFriendsInterface): Promise<boolean> {
    const userModel = this.neode.model('User');
    const query = this.neode.query();
    const friendsRelationRes = await query
      .match('first', userModel)
      .where('first.id', params.firstUserId)
      .relationship('FRIENDS', 'direction_both', 'rel', 1)
      .to('second', userModel)
      .where('second.id', params.secondUserId)
      .return('first', 'rel', 'second')
      .execute();

    return !!friendsRelationRes.records.length;
  }

  async sendFriendRequest(params: SendFriendRequestInterface) {
    const areFriends = await this.areFriends({
      firstUserId: params.initiatorUserId,
      secondUserId: params.recipientUserId,
    });
    if (areFriends) {
      throw new HttpException('Already friends', 422);
    }

    const friendRequestExists = await this.friendRequestExists(params);
    if (friendRequestExists) {
      throw new HttpException('Friend request already exists', 422);
    }

    const createFriendRequestQuery = `
        MATCH
          (first: User),
          (second: User)
        WHERE first.id = $firstId AND second.id = $secondId
        CREATE (first)-[r:FRIEND_REQUEST]->(second)
        RETURN type(r)
    `;
    await this.neode.cypher(createFriendRequestQuery, {
      firstId: params.initiatorUserId,
      secondId: params.recipientUserId,
    });
  }

  async acceptFriendRequest(params: AcceptFriendRequestInterface) {
    const areFriends = await this.areFriends({
      firstUserId: params.initiatorUserId,
      secondUserId: params.confirmedUserId,
    });
    if (areFriends) {
      throw new HttpException('Already friends', 422);
    }

    const friendRequestExists = await this.friendRequestExists({
      initiatorUserId: params.initiatorUserId,
      recipientUserId: params.confirmedUserId,
    });
    if (!friendRequestExists) {
      throw new HttpException('Friend request does not exists', 422);
    }

    const deleteFriendRequestRelQuery = `
        MATCH
          (first: User)-[rel:FRIEND_REQUEST]->(second: User)
        WHERE (first.id = $firstId AND second.id = $secondId) 
        DELETE rel`;
    const createFriendRelQuery = `
        MATCH
          (first: User),
          (second: User)
        WHERE first.id = $firstId AND second.id = $secondId
        CREATE (first)-[r:FRIENDS]->(second)
        RETURN type(r)`;

    await this.neode.batch([
      {
        query: deleteFriendRequestRelQuery,
        params: {
          firstId: params.initiatorUserId,
          secondId: params.confirmedUserId,
        },
      },
      {
        query: createFriendRelQuery,
        params: {
          firstId: params.initiatorUserId,
          secondId: params.confirmedUserId,
        },
      },
    ]);
  }
}