import { Test, TestingModule } from '@nestjs/testing';
import { LineupsService } from './lineups.service';
import { ConfigModule } from '@nestjs/config';
import { NeodeModule } from '@src/neo4j/neo4j.module';
import EventsSchema from '@src/events/events.schema';
import UserSchema from '@src/users/users.schema';
import LineupsSchema from '@src/lineups/lineups.schema';

describe('LineupsService', () => {
  let lineupsService: LineupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        NeodeModule.forFeature({
          Event: EventsSchema,
          User: UserSchema,
          Lineup: LineupsSchema,
        }),
      ],
      providers: [LineupsService],
    }).compile();

    lineupsService = module.get<LineupsService>(LineupsService);
  });

  it('should be defined', () => {
    expect(lineupsService).toBeDefined();
  });
});
