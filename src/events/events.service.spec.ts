import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { ConfigModule } from '@nestjs/config';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import UserSchema from '@src/users/users.schema';
import { UsersService } from '@src/users/users.sevice';
import Neode from 'neode';
import { CategoriesEnum } from '@src/events/interfaces/categories.interface';
import { CaslModule } from '@src/casl/casl.module';
import EventsSchema from '@src/events/events.schema';
import { omit } from 'lodash';
import { HttpException } from '@nestjs/common';
import { Action } from '@src/generic.interface';

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
const firstEvent = {
  name: 'fistEvent',
  category: CategoriesEnum.OFFLINE_EVENT,
  price: 100,
  purchaseLink: 'https://localhost',
  description: 'Some event',
  link: 'https://localhost',
  age: 18,
  maxPerson: 45,
};
const secondEvent = {
  name: 'second',
  category: CategoriesEnum.OFFLINE_EVENT,
  price: 2,
  purchaseLink: 'https://123',
  description: 'Second',
  link: 'https://234',
  age: 0,
  maxPerson: 0,
};

describe('EventsService', () => {
  let eventsService: EventsService;
  let usersService: UsersService;
  let neode: Neode;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        NeodeModule.forFeature({ Event: EventsSchema, User: UserSchema }),
        CaslModule,
      ],
      providers: [EventsService, UsersService],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    usersService = module.get<UsersService>(UsersService);
    neode = module.get<Neode>('Connection');
    await Promise.all([neode.deleteAll('User'), neode.deleteAll('Event')]);
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });

  it('create event', async () => {
    const firstUserDb = await usersService.save(firstUser);

    const { id } = await eventsService.create({
      event: firstEvent,
      ownerId: firstUserDb.id,
    });
    const eventDb = await eventsService.findOne({ eventId: id });
    expect(omit(eventDb, ['id', '_id', 'owner'])).toMatchSnapshot();
  });

  it('update event', async () => {
    const firstUserDb = await usersService.save(firstUser);

    const { id } = await eventsService.create({
      event: firstEvent,
      ownerId: firstUserDb.id,
    });

    const eventDb = await eventsService.update({
      eventId: id,
      event: secondEvent,
      user: firstUserDb,
    });
    expect(omit(eventDb, ['id', '_id', 'owner'])).toMatchSnapshot();
  });

  test('update event of another user', async () => {
    const firstUserDb = await usersService.save(firstUser);
    const secondUserDb = await usersService.save(secondUser);

    const { id } = await eventsService.create({
      event: firstEvent,
      ownerId: firstUserDb.id,
    });

    await expect(
      eventsService.update({
        eventId: id,
        event: secondEvent,
        user: secondUserDb,
      }),
    ).rejects.toThrow(new HttpException(`Can not ${Action.UPDATE} event`, 403));
  });

  it('delete event', async () => {
    const firstUserDb = await usersService.save(firstUser);

    const { id } = await eventsService.create({
      event: firstEvent,
      ownerId: firstUserDb.id,
    });

    await eventsService.remove({ eventId: id, user: firstUserDb });
    await expect(eventsService.findOne({ eventId: id })).rejects.toThrow(
      new HttpException('Event not found', 404),
    );
  });

  test('delete event of another user', async () => {
    const firstUserDb = await usersService.save(firstUser);
    const secondUserDb = await usersService.save(secondUser);

    const { id } = await eventsService.create({
      event: firstEvent,
      ownerId: firstUserDb.id,
    });

    await expect(
      eventsService.remove({
        eventId: id,
        user: secondUserDb,
      }),
    ).rejects.toThrow(new HttpException(`Can not ${Action.DELETE} event`, 403));
  });
});
