import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from '@src/generic.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';
import { Injectable } from '@nestjs/common';
import {
  Entity,
  Event,
  Lineup,
} from '@src/casl/interfaces/policy-handler.interface';

type Subjects = InferSubjects<typeof Entity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserInterface) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    // Event acl
    can(Action.UPDATE, Event, { ownerId: user.id });
    can(Action.DELETE, Event, { ownerId: user.id });

    // Lineup acl
    can(Action.CREATE, Lineup, { eventOwnerId: user.id });
    can(Action.UPDATE, Lineup, { eventOwnerId: user.id });
    can(Action.DELETE, Lineup, { eventOwnerId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
