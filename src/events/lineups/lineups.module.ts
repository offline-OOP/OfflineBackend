import { Module } from '@nestjs/common';
import { LineupsController } from './lineups.controller';
import { LineupsService } from './lineups.service';
import { CaslModule } from '@src/casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [LineupsController],
  providers: [LineupsService],
})
export class LineupsModule {}
