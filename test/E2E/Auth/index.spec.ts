import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Index } from '../../../src/App/app.module';
import { UsersService } from 'src/User/user.sevice';
import { user } from './__fixtures__/User';
import { NeodeModule } from 'src/Neo4j/neo4j.module';
import UserSchema from 'src/User/Schemas/user.schema';
import Neode from 'neode';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let neode: Neode;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [Index, NeodeModule.forFeature({ User: UserSchema })],
      providers: [UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    neode = moduleFixture.get<Neode>('Connection');
    userService = moduleFixture.get<UsersService>(UsersService);
  });

  beforeEach(async () => {
    await neode.deleteAll('User');
  });

  it('/auth/login (POST) 201', async () => {
    await userService.save(user);
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201);
  });

  it('/auth/login (POST) 401', async () => {
    await userService.save(user);
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: '1273',
      })
      .expect(401);
  });

  it('/auth/register (POST) 200', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: user.email,
        password: user.password,
        name: user.name,
      })
      .expect(201);

    const userDb = await userService.findOne(user.email);
    expect(userDb.name).toEqual(user.name);
    expect(userDb.email).toEqual(user.email);
  });
});
