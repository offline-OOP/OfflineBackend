import { AppAbility } from '@src/casl/casl-ability.factory';
import { Action, RequestData } from '@src/generic.interface';
import {
  Lineup,
  PolicyHandler,
} from '@src/casl/interfaces/policy-handler.interface';

export class CreateLineupHandler implements PolicyHandler {
  private data: RequestData;
  constructor(data: RequestData) {
    this.data = data;
  }

  handle(ability: AppAbility): boolean {
    if (!this.data.event) return false;

    const lineup = new Lineup({
      eventOwnerId: this.data.event.owner.id,
    });
    return ability.can(Action.CREATE, lineup);
  }
}
