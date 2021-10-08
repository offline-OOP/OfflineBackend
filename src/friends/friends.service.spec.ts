import { Test, TestingModule } from '@nestjs/testing';
import { FriendsService } from './friends.service';
import { UsersService } from '@src/users/users.sevice';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import UserSchema from '@src/users/users.schema';
import Neode from 'neode';
import { ConfigModule } from '@nestjs/config';

const initiatorUser = {
  name: 'initiator',
  password: 'F^U3Lk0QU5',
  email: 'initiator@mail.ru',
};
const recipientUserId = {
  name: 'recipient',
  password: 'F^U3Lk0QU5',
  email: 'recipient@mail.ru',
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

  it('should be defined', () => {
    expect(friendsService).toBeDefined();
  });

  it('validate that friend request created', async () => {
    const initiatorUserDb = await usersService.save(initiatorUser);
    const recipientUserDb = await usersService.save(recipientUserId);
    const params = {
      initiatorUserId: initiatorUserDb.id,
      recipientUserId: recipientUserDb.id,
    };
    await friendsService.sendFriendRequest(params);
    const friendRequestSent = await friendsService.friendRequestExists(params);
    expect(friendRequestSent).toBeTruthy();
  });

  it('accept friend request', async () => {
    const initiatorUserDb = await usersService.save(initiatorUser);
    const recipientUserDb = await usersService.save(recipientUserId);
    const params = {
      initiatorUserId: initiatorUserDb.id,
      recipientUserId: recipientUserDb.id,
    };
    await friendsService.sendFriendRequest(params);
    const friendRequestSent = await friendsService.friendRequestExists(params);
    expect(friendRequestSent).toBeTruthy();
    await friendsService.acceptFriendRequest({
      confirmedUserId: recipientUserDb.id,
      initiatorUserId: initiatorUserDb.id,
    });
    const areFriends = await friendsService.areFriends({
      firstUserId: params.initiatorUserId,
      secondUserId: params.recipientUserId,
    });
    expect(areFriends).toBeTruthy();
  });
});
