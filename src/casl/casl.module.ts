import { Module } from '@nestjs/common';
import { CaslEventsAbilityFactory } from '@src/casl/casl-events-ability.factory';

@Module({
  providers: [CaslEventsAbilityFactory],
  exports: [CaslEventsAbilityFactory],
})
export class CaslModule {}
