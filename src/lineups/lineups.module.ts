import { Module } from '@nestjs/common';
import { LineupsController } from './lineups.controller';
import { LineupsService } from './lineups.service';
import { EventsService } from '@src/events/events.service';

@Module({
  imports: [EventsService],
  controllers: [LineupsController],
  providers: [LineupsService],
})
export class LineupsModule {}
