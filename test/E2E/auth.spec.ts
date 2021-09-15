import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Index } from '#Modules/App';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [Index],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) 201', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'JKHGY76bhwDW',
      })
      .expect(201);
  });

  it('/auth/login (POST) 401', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: '1273',
      })
      .expect(401);
  });
});
