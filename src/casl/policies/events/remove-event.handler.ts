import { AppAbility } from '@src/casl/casl-ability.factory';
import { Action, RequestData } from '@src/generic.interface';
import {
  Event,
  PolicyHandler,
} from '@src/casl/interfaces/policy-handler.interface';

export class RemoveEventHandler implements PolicyHandler {
  private data: RequestData;
  constructor(data: RequestData) {
    this.data = data;
  }

  handle(ability: AppAbility): boolean {
    if (!this.data.event) return false;

    const ev = new Event({ ownerId: this.data.event.owner.id });
    return ability.can(Action.DELETE, ev);
  }
}
