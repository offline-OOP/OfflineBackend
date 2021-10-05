import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Index } from '#Modules/App';
import { UsersService } from '#Services/Users';
import { user } from './__fixtures__/User';
import { NeodeModule } from '#Modules/Neo4j';
import UserSchema from '#Schemas/User';
import Neode from 'neode';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [Index, NeodeModule.forFeature({ User: UserSchema })],
      providers: [UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const neode = moduleFixture.get<Neode>('Connection');
    await neode.deleteAll('User');
    userService = moduleFixture.get<UsersService>(UsersService);

    await userService.save(user);
  });

  it('/auth/login (POST) 201', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201);
  });

  it('/auth/login (POST) 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: '1273',
      })
      .expect(401);
  });
});
