import { Test, TestingModule } from '@nestjs/testing';
import { FriendsService } from './friends.service';
import { UsersService } from '@src/users/users.sevice';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import UserSchema from '@src/users/users.schema';
import Neode from 'neode';
import { ConfigModule } from '@nestjs/config';
import { DirectionEnum } from '@src/friends/interfaces/frineds.service.interfaces';

const firstUser = {
  name: 'first',
  password: 'F^U3Lk0QU5',
  email: 'first@mail.ru',
};
const secondUser = {
  name: 'seconds',
  password: 'F^U3Lk0QU5',
  email: 'second@mail.ru',
};
const thirdUser = {
  name: 'third',
  password: 'F^U3Lk0QU5',
  email: 'third@mail.ru',
};

describe('FriendsService', () => {
  let friendsService: FriendsService;
  let usersService: UsersService;
  let neode: Neode;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        NeodeModule.forFeature({ User: UserSchema }),
      ],
      providers: [FriendsService, UsersService],
    }).compile();

    friendsService = module.get<FriendsService>(FriendsService);
    usersService = module.get<UsersService>(UsersService);
    neode = module.get<Neode>('Connection');
    await neode.deleteAll('User');
  });

  afterAll(async () => {
    await neode.close();
  });

  it('should be defined', () => {
    expect(friendsService).toBeDefined();
  });

  it('validate that friend request created', async () => {
    const firstUserDb = await usersService.save(firstUser);
    const secondUserDb = await usersService.save(secondUser);
    const params = {
      initiatorUserId: firstUserDb.id,
      recipientUserId: secondUserDb.id,
    };
    await friendsService.sendFriendRequest(params);
    const friendRequestSent = await friendsService.friendRequestExists(params);
    expect(friendRequestSent).toBeTruthy();
  });

  it('accept friend request', async () => {
    const firstUserDb = await usersService.save(firstUser);
    const secondUserDb = await usersService.save(secondUser);
    const params = {
      initiatorUserId: firstUserDb.id,
      recipientUserId: secondUserDb.id,
    };
    await friendsService.sendFriendRequest(params);
    const friendRequestSent = await friendsService.friendRequestExists(params);
    expect(friendRequestSent).toBeTruthy();
    await friendsService.acceptFriendRequest({
      confirmedUserId: secondUserDb.id,
      initiatorUserId: firstUserDb.id,
    });
    const areFriends = await friendsService.areFriends({
      firstUserId: params.initiatorUserId,
      secondUserId: params.recipientUserId,
    });
    expect(areFriends).toBeTruthy();
  });

  it('Get friend requests', async () => {
    const firstUserDb = await usersService.save(firstUser);
    const secondUserDb = await usersService.save(secondUser);
    const thirdUserDb = await usersService.save(thirdUser);
    await friendsService.sendFriendRequest({
      initiatorUserId: firstUserDb.id,
      recipientUserId: secondUserDb.id,
    });
    await friendsService.sendFriendRequest({
      initiatorUserId: thirdUserDb.id,
      recipientUserId: secondUserDb.id,
    });

    const secondUserIncomingFriendRequests =
      await friendsService.getFriendRequests({
        page: 1,
        limit: 100,
        userId: secondUserDb.id,
        direction: DirectionEnum.in,
      });
    expect(secondUserIncomingFriendRequests.length).toBe(2);
    const firstUserOutgoingFriendRequests =
      await friendsService.getFriendRequests({
        page: 1,
        limit: 100,
        userId: firstUserDb.id,
        direction: DirectionEnum.out,
      });
    expect(firstUserOutgoingFriendRequests.length).toBe(1);
    const thirdUserOutgoingFriendRequests =
      await friendsService.getFriendRequests({
        page: 1,
        limit: 100,
        userId: firstUserDb.id,
        direction: DirectionEnum.out,
      });
    expect(thirdUserOutgoingFriendRequests.length).toBe(1);
  });

  it('Get friend of user', async () => {
    const firstUserDb = await usersService.save(firstUser);
    const secondUserDb = await usersService.save(secondUser);
    const thirdUserDb = await usersService.save(thirdUser);
    await friendsService.sendFriendRequest({
      initiatorUserId: firstUserDb.id,
      recipientUserId: secondUserDb.id,
    });
    await friendsService.sendFriendRequest({
      initiatorUserId: thirdUserDb.id,
      recipientUserId: secondUserDb.id,
    });
    await friendsService.acceptFriendRequest({
      initiatorUserId: firstUserDb.id,
      confirmedUserId: secondUserDb.id,
    });
    await friendsService.acceptFriendRequest({
      initiatorUserId: thirdUserDb.id,
      confirmedUserId: secondUserDb.id,
    });

    const firstUserFriends = await friendsService.getFriends({
      userId: firstUserDb.id,
      page: 1,
      limit: 100,
    });
    expect(firstUserFriends.length).toBe(1);
    const secondUserFriends = await friendsService.getFriends({
      userId: secondUserDb.id,
      page: 1,
      limit: 100,
    });
    expect(secondUserFriends.length).toBe(2);
    const thirdUserFriends = await friendsService.getFriends({
      userId: thirdUserDb.id,
      page: 1,
      limit: 100,
    });
    expect(thirdUserFriends.length).toBe(1);
  });
});
