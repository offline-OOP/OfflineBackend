import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from '@src/generic.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';
import { EventClass } from '@src/casl/classes/event.class';
import { HttpException, Injectable } from '@nestjs/common';

type Subjects = InferSubjects<typeof EventClass> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslEventsAbilityFactory {
  createForUser(user: UserInterface) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.READ, 'all');
    can(Action.UPDATE, EventClass, { ownerId: user.id });
    can(Action.DELETE, EventClass, { ownerId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  async hasAbility(user: UserInterface, action: Action, ownerId: string) {
    const ability = this.createForUser(user);
    const eventClass = new EventClass();
    eventClass.ownerId = ownerId;

    if (ability.cannot(action, eventClass)) {
      throw new HttpException(`Can not ${action} event`, 403);
    }
  }
}
