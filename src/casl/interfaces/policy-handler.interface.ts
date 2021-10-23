import { AppAbility } from '@src/casl/casl-ability.factory';
import { RequestData } from '@src/generic.interface';

export interface PolicyHandler {
  handle(ability: AppAbility): boolean;
}

export interface PolicyHandlerConstructor {
  new (data: RequestData): PolicyHandler;
}

export class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

export class Event extends Entity {
  ownerId: string;
}
